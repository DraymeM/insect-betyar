import React from 'react';
import { Row } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import Section from '../components/common/Section';
import ContactInfo from '../components/common/ContactInfo';
import ContactForm from '../components/common/ContactForm';

const Contact: React.FC = () => {
  const handleSubmit = async (formData: { name: string; email: string; message: string }) => {
    // Replace with your EmailJS Service ID, Template ID, and User ID
    await emailjs.send(
      'YOUR_SERVICE_ID', // Service ID
      'YOUR_TEMPLATE_ID', // Template ID
      formData,
      'YOUR_USER_ID' // User ID
    );
  };

  return (
    <div className="page">
      <Section className="d-flex justify-content-center align-items-center">
        <Row className="mb-5">
          <ContactInfo
            email="info@example.com"
            phone="+1 (123) 456-7890"
            address="123 Main Street, City, Country"
          />
          <ContactForm onSubmit={handleSubmit} />
        </Row>
      </Section>
    </div>
  );
};

export default Contact;