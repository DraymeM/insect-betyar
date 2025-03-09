// src/components/common/ContactForm.tsx
import React, { useState } from 'react';
import { Col, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion'; // Import Framer Motion

interface ContactFormProps {
  onSubmit: (formData: { name: string; email: string; message: string }) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
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
      await onSubmit(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setError('Failed to send the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.2 },
    }),
  };

  const alertVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <Col md={6}>
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2>Küld el nekünk az üzeneted</h2>
        {isSuccess && (
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
          >
            <Alert variant="success" className="mb-4">
              Sikeresen elküldted az üzeneted!
            </Alert>
          </motion.div>
        )}
        {error && (
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
          >
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          </motion.div>
        )}
        <Form onSubmit={handleSubmit}>
          {[
            { id: 'formName', label: 'Name', name: 'name', placeholder: 'Írd be a neved', type: 'text' },
            { id: 'formEmail', label: 'Email address', name: 'email', placeholder: 'Írd be az email címed', type: 'email' },
            { id: 'formMessage', label: 'Message', name: 'message', placeholder: 'Írd be az üzeneted', type: 'textarea' },
          ].map((field, index) => (
            <motion.div
              key={field.id}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Form.Group className="mb-2" controlId={field.id}>
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'textarea' ? (
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                  />
                )}
              </Form.Group>
            </motion.div>
          ))}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Küldés'}
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </Col>
  );
};

export default ContactForm;