import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";

const orderSchema = z.object({
  firstName: z.string().min(3, "Kérlek add meg a keresztneved."),
  lastName: z.string().min(3, "Kérlek add meg a vezetékneved."),
  email: z.string().email("Érvényes email cím szükséges."),
  country: z.string().min(1, "Válassz országot."),
  city: z.string().min(1, "Kérlek add meg a várost."),
  street: z.string().min(1, "Kérlek add meg az utcát."),
  houseNumber: z.string().min(1, "Kérlek add meg a házszámot."),
  deliveryMethod: z.string().min(1, "Válassz szállítási módot."),
  paymentMethod: z.string().min(1, "Válassz fizetési módot."),
});

interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  deliveryMethod: string;
  paymentMethod: string;
}

const countries = [
  "Magyarország",
  "Szlovákia",
  "Szlovénia",
  "Csehország",
  "Románia",
  "Szerbia",
  "Lengyelország",
] as const;

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    deliveryMethod: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    const validationResult = orderSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors({
        firstName: fieldErrors.firstName?._errors[0],
        lastName: fieldErrors.lastName?._errors[0],
        email: fieldErrors.email?._errors[0],
        country: fieldErrors.country?._errors[0],
        city: fieldErrors.city?._errors[0],
        street: fieldErrors.street?._errors[0],
        houseNumber: fieldErrors.houseNumber?._errors[0],
        deliveryMethod: fieldErrors.deliveryMethod?._errors[0],
        paymentMethod: fieldErrors.paymentMethod?._errors[0],
      });
    } else {
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = orderSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors({
        firstName: fieldErrors.firstName?._errors[0],
        lastName: fieldErrors.lastName?._errors[0],
        email: fieldErrors.email?._errors[0],
        country: fieldErrors.country?._errors[0],
        city: fieldErrors.city?._errors[0],
        street: fieldErrors.street?._errors[0],
        houseNumber: fieldErrors.houseNumber?._errors[0],
        deliveryMethod: fieldErrors.deliveryMethod?._errors[0],
        paymentMethod: fieldErrors.paymentMethod?._errors[0],
      });
      return;
    }
    setSubmitted(true);

    submitted;
  };

  return (
    <div className="container mt-5 mb-5 pt-5 flex">
      <h2>Megrendelési adatok</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Vezetéknév</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                className="bg-dark text-light border border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Keresztnév</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                className="bg-dark text-light border border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            className="bg-dark text-light border border-secondary"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Ország</Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                isInvalid={!!errors.country}
                className="bg-dark text-light border border-secondary"
              >
                <option value="">Válassz országot</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Város</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
                className="bg-dark text-light border border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Utca</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                isInvalid={!!errors.street}
                className="bg-dark text-light border border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.street}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Házszám</Form.Label>
              <Form.Control
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                isInvalid={!!errors.houseNumber}
                className="bg-dark text-light border border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                {errors.houseNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Szállítási mód</Form.Label>
          <div className="d-flex gap-3 flex-wrap">
            {["foxpost", "packeta", "easybox"].map((method) => {
              const isSelected = formData.deliveryMethod === method;
              return (
                <div
                  key={method}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, deliveryMethod: method }))
                  }
                  style={{
                    minWidth: "120px",
                    textAlign: "center",
                    border: "1px solid",
                    borderColor: isSelected ? "#0d6efd" : "#6c757d",
                    backgroundColor: isSelected ? "#0d6efd" : "#212529",
                    color: isSelected ? "white" : "white",
                    borderRadius: "0.375rem",
                    padding: "1rem",
                    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {method === "foxpost" && "FoxPost"}
                  {method === "packeta" && "Packeta"}
                  {method === "easybox" && "EasyBox"}

                  {isSelected && (
                    <FaCheck
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 8,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          {errors.deliveryMethod && (
            <div className="text-danger">{errors.deliveryMethod}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fizetési mód</Form.Label>
          <Form.Check
            type="radio"
            label="Előre utalás"
            name="paymentMethod"
            value="előre utalás"
            checked={formData.paymentMethod === "előre utalás"}
            onChange={handleChange}
            isInvalid={!!errors.paymentMethod}
          />
          <Form.Check
            type="radio"
            label="Utánvét"
            name="paymentMethod"
            value="utánvét"
            checked={formData.paymentMethod === "utánvét"}
            onChange={handleChange}
            isInvalid={!!errors.paymentMethod}
          />
          {errors.paymentMethod && (
            <div className="text-danger">{errors.paymentMethod}</div>
          )}
        </Form.Group>

        <Form.Group className="d-flex justify-content-between mt-4">
          <Button
            variant="secondary"
            onClick={() => navigate({ to: "/cart" })} // Navigates back to the cart page
          >
            <FaArrowLeft /> Vissza
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            <FaArrowRight /> Tovább
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OrderForm;
