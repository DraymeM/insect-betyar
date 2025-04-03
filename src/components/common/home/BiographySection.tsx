import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { SectionWrapper } from "../Section";

type LayoutMode = "default" | "mirrored";

interface BiographySectionProps {
  mode?: LayoutMode;
  imageUrl: string; // Required prop
  title: string; // Required prop
  paragraphs: string[]; // Required prop
  className?: string;
  imageAlt?: string;
  imageClassName?: string;
  textClassName?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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
    <Col md={5} className={`mb-4 mb-md-0 px-0 ${imageClassName}`}>
      <motion.div
        variants={sectionVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-center"
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className={`img-fluid rounded shadow w-100 ml-1 ${imageClassName}`}
          style={{ maxHeight: "400px", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
          }}
        />
      </motion.div>
    </Col>
  );

  const textCol = (
    <Col md={7} className={`mb-4 mb-md-0 ps-md-4 ${textClassName}`}>
      <motion.div variants={sectionVariants}>
        <h2 className="mb-4">{title}</h2>
        {paragraphs.map((text, index) => (
          <motion.p key={index} variants={sectionVariants}>
            {text}
          </motion.p>
        ))}
      </motion.div>
    </Col>
  );

  return (
    <SectionWrapper className={className}>
      <Container
        className={`py-4 d-flex bg-dark text-light rounded shadow-sm mt-5 ${className}`}
      >
        <Row className="align-items-center g-0">
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
      </Container>
    </SectionWrapper>
  );
};

export default BiographySection;
