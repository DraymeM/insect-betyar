import React, { useState } from "react";
import {
  Col,
  Form,
  Button,
  Alert,
  ProgressBar,
  Container,
  Row,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { z } from "zod";
import "bootstrap/dist/css/bootstrap.min.css";

interface ContactFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    message: string;
  }) => Promise<void>;
}

// Define Zod schema
const contactSchema = z.object({
  name: z.string().min(3, "A név legalább 3 karakter hosszú kell legyen"),
  email: z.string().email("Érvényes email címet adj meg"),
  message: z
    .string()
    .min(10, "Az üzenet legalább 10 karakter hosszú kell legyen"),
});

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change
    const validationResult = contactSchema.safeParse({
      ...formData,
      [name]: value,
    });
    if (!validationResult.success) {
      const fieldError = validationResult.error.format();
      setErrors({
        name: fieldError.name?._errors[0],
        email: fieldError.email?._errors[0],
        message: fieldError.message?._errors[0],
      });
    } else {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setIsSuccess(false);
    setProgress(0);

    // Validate form before submission
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldError = validationResult.error.format();
      setErrors({
        name: fieldError.name?._errors[0],
        email: fieldError.email?._errors[0],
        message: fieldError.message?._errors[0],
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      await onSubmit(formData);
      setProgress(100);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      setProgress(0);
      setError("Nem sikerült elküldeni az üzeneted. Kérlek próbáld újra!");
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="text-light py-5">
      <Row className="justify-content-center">
        <Col sm={20} md={24} lg={30} className="w-full">
          <motion.div className="p-4">
            <h2 className="text-center mb-4 text-light">
              Küld el nekünk az üzeneted
            </h2>

            {isSuccess && (
              <Alert variant="success">
                ✅ Sikeresen elküldted az üzeneted!
              </Alert>
            )}
            {error && <Alert variant="danger">❌ {error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {[
                {
                  id: "formName",
                  label: "Név",
                  name: "name",
                  type: "text",
                  placeholder: "Írd be a neved",
                },
                {
                  id: "formEmail",
                  label: "Email cím",
                  name: "email",
                  type: "email",
                  placeholder: "Írd be az email címed",
                },
                {
                  id: "formMessage",
                  label: "Üzenet",
                  name: "message",
                  type: "textarea",
                  placeholder: "Írd be az üzeneted",
                },
              ].map((field) => (
                <Form.Group key={field.id} className="mb-4">
                  <Form.Label className="fw-bold text-light">
                    {field.label}
                  </Form.Label>
                  {field.type === "textarea" ? (
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className={`bg-dark text-light border-secondary shadow-sm ${errors[field.name as keyof typeof errors] ? "is-invalid" : ""}`}
                    />
                  ) : (
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className={`bg-dark text-light border-secondary shadow-sm ${errors[field.name as keyof typeof errors] ? "is-invalid" : ""}`}
                    />
                  )}
                  {errors[field.name as keyof typeof errors] && (
                    <div className="text-danger mt-1">
                      {errors[field.name as keyof typeof errors]}
                    </div>
                  )}
                </Form.Group>
              ))}

              {isSubmitting && (
                <ProgressBar
                  animated
                  now={progress}
                  label={`${progress}%`}
                  className="mb-3"
                />
              )}

              <div className="text-center ">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="subm-btn bg-info px-5 py-2 fw-bold shadow-sm"
                >
                  {isSubmitting ? "Küldés folyamatban..." : "Küldés"}
                </Button>
              </div>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
