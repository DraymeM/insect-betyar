import React from "react";
import emailjs from "emailjs-com";
import Section from "../common/Section";
import ContactForm from "../common/ContactForm";

const Contact: React.FC = () => {
  const handleSubmit = async (formData: {
    name: string;
    email: string;
    message: string;
  }) => {
    // Replace with your EmailJS Service ID, Template ID, and User ID
    await emailjs.send(
      "YOUR_SERVICE_ID", // Service ID
      "YOUR_TEMPLATE_ID", // Template ID
      formData,
      "YOUR_USER_ID" // User ID
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 w-100 text-center overflow-hidden">
      <Section className="d-flex justify-content-center align-items-center">
        <ContactForm onSubmit={handleSubmit} />
      </Section>
    </div>
  );
};

export default Contact;
