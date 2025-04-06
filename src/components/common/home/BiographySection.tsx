import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

type LayoutMode = "default" | "mirrored";

interface BiographySectionProps {
  mode?: LayoutMode;
  imageUrl: string;
  title: string;
  paragraphs: string[];
  className?: string;
  imageAlt?: string;
  imageClassName?: string;
  textClassName?: string;
  category?: string;
  page?: string;
  limit?: string;
  goBackLink?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

export const BiographySection = ({
  mode = "default",
  imageUrl,
  title,
  paragraphs,
  className = "",
  imageAlt = "Biography image",
  imageClassName = "",
  textClassName = "",
}: BiographySectionProps) => {
  const imageCol = (
    <Col lg={4} md={12}>
      <motion.div
        className="rounded shadow overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="d-flex align-items-center justify-content-center bg-white"
          style={{ height: "25rem", overflow: "hidden" }}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`img-fluid rounded shadow w-100 ${imageClassName}`}
            style={{
              objectFit: "cover", // Makes the image cover the container, cropping and zooming as needed
              objectPosition: "center", // Centers the image
              maxHeight: "100%",
              height: "100%", // Ensures the image covers the full height
            }}
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
        </div>
      </motion.div>
    </Col>
  );

  const textCol = (
    <Col lg={8} md={12}>
      <motion.div
        className={`bg-dark text-light p-4 rounded shadow h-100 d-flex flex-column ${textClassName}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="border-bottom border-secondary pb-2 mb-4">{title}</h3>
        <div className="flex-grow-1">
          {paragraphs.map((text, index) => (
            <motion.p key={index} variants={sectionVariants}>
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </Col>
  );

  return (
    <Container className={`py-2 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={sectionVariants}
      >
        <Row className="g-4 mt-5">
          {mode === "default" ? (
            <>
              {imageCol}
              {textCol}
            </>
          ) : (
            <>
              {textCol}
              {imageCol}
            </>
          )}
        </Row>
      </motion.div>
    </Container>
  );
};

export default BiographySection;
