import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSuccess(false);

    try {
      // Replace with your EmailJS Service ID, Template ID, and User ID
      await emailjs.send(
        'YOUR_SERVICE_ID', // Service ID
        'YOUR_TEMPLATE_ID', // Template ID
        formData,
        'YOUR_USER_ID' // User ID
      );

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setError('Failed to send the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      {/* Contact Section */}
      <div className="section py-5">
          <h1 className="text-center mb-4">Contact Us</h1>
        <Container>
          {/* Heading */}

          {/* Contact Information */}
          <Row className="mb-5">
            <Col md={6} className="mb-4 mb-md-0">
              <h2>Contact Information</h2>
              <div style={{ backgroundColor: '#17181a', color: 'white', padding: '15px', borderRadius: '5px' }}>
              <p>
                <strong>Email:</strong> info@example.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (123) 456-7890
              </p>
              <p>
                <strong>Address:</strong> 123 Main Street, City, Country
              </p>
              </div>
            </Col>

            {/* Contact Form */}
            <Col md={6}>
              <h2>Send Us a Message</h2>
              {isSuccess && (
                <Alert variant="success" className="mb-4">
                  Your message has been sent successfully!
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Contact;