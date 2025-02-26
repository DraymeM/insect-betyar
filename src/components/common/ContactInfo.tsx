import React from 'react';
import { Col } from 'react-bootstrap';

interface ContactInfoProps {
  email: string;
  phone: string;
  address: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ email, phone, address }) => {
  return (
    <Col md={6} className="mb-4 mb-md-0">
      <h2>Contact Information</h2>
      <div style={{ backgroundColor: '#17181a', color: 'white', padding: '15px', borderRadius: '5px' }}>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
      </div>
    </Col>
  );
};

export default ContactInfo;