// src/components/common/ContactForm.tsx
import React, { useState } from 'react';
import { Col, Form, Button, Alert, Tooltip, OverlayTrigger, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [progress, setProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSuccess(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      await onSubmit(formData);
      setProgress(100);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setProgress(0);
      setError('Nem sikerült elküldeni az üzeneted.Kérlek próbáld újra!');
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  // Animation Variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.2 },
    }),
  };

  const alertVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const renderTooltip = (text: string) => (
    <Tooltip id={`tooltip-${text.toLowerCase().replace(' ', '-')}`} className="bg-dark text-light">
      {text}
    </Tooltip>
  );

  return (
    <Col md={8} lg={6} className="mx-auto">
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="p-4"
      >
        <h2 className="text-center mb-4 text-light">Küld el nekünk az üzeneted</h2>

        {isSuccess && (
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
          >
            <Alert variant="success" className="mb-4 d-flex align-items-center bg-success text-light border-0">
              <span className="me-2">✅</span> Sikeresen elküldted az üzeneted!
            </Alert>
          </motion.div>
        )}
        {error && (
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
          >
            <Alert variant="danger" className="mb-4 d-flex align-items-center bg-danger text-light border-0">
              <span className="me-2">❌</span> {error}
            </Alert>
          </motion.div>
        )}

        <Form onSubmit={handleSubmit}>
          {[
            { id: 'formName', label: 'Name', name: 'name', placeholder: 'Írd be a neved', type: 'text', tooltip: 'A teljes neved' },
            { id: 'formEmail', label: 'Email address', name: 'email', placeholder: 'Írd be az email címed', type: 'email', tooltip: 'Valid email' },
            { id: 'formMessage', label: 'Message', name: 'message', placeholder: 'Írd be az üzeneted', type: 'textarea', tooltip: 'Rendelésed' },
          ].map((field, index) => (
            <motion.div
              key={field.id}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Form.Group className="mb-3" controlId={field.id}>
                <OverlayTrigger placement="top" overlay={renderTooltip(field.tooltip)}>
                  <Form.Label className="fw-bold text-light">{field.label}</Form.Label>
                </OverlayTrigger>
                {field.type === 'textarea' ? (
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="bg-dark text-light border-secondary shadow-sm"
                  />
                ) : (
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="bg-dark text-light border-secondary shadow-sm"
                  />
                )}
              </Form.Group>
            </motion.div>
          ))}

          {isSubmitting && (
            <ProgressBar
              animated
              now={progress}
              label={`${progress}%`}
              variant="light"
              className="mb-3 bg-dark text-light"
            />
          )}

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="text-center"
          >
            <OverlayTrigger placement="top" overlay={renderTooltip('Küld el üzeneted')}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="subm-btn px-5 py-2 fw-bold shadow-sm"
              >
                {isSubmitting ? 'Sending...' : 'Küldés'}
              </Button>
            </OverlayTrigger>
          </motion.div>
        </Form>
      </motion.div>
    </Col>
  );
};

export default ContactForm;