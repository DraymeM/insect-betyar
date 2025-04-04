import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { SectionWrapper } from "../Section";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  imageUrl: string;
  rating: number; // 1-5
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
  },
};

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const renderStars = (rating: number) => {
  return (
    <div className="d-flex mb-2 justify-content-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill={i < rating ? "#FFD700" : "#6c757d"}
          viewBox="0 0 16 16"
          className="me-1"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      ))}
    </div>
  );
};

export const TestimonialsSection = ({
  testimonials,
  className = "mt-0 mb-0",
}: TestimonialsSectionProps) => {
  return (
    <SectionWrapper className={`${className}`}>
      <Container className="py-5">
        <motion.h2
          className="text-center mb-5 text-uppercase fw-bold text-white"
          variants={sectionVariants}
        ></motion.h2>

        <Row className="g-4">
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} md={4}>
              <motion.div
                className="p-4 bg-dark text-white rounded-3 h-100 d-flex flex-column "
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-center mb-3">
                  <div className="position-relative d-inline-block">
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="rounded-circle border border-3 border-secondary"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.src = placeholderImage;
                      }}
                    />
                  </div>
                </div>

                {renderStars(testimonial.rating)}

                <motion.blockquote
                  className="flex-grow-1 mb-3 text-center"
                  variants={sectionVariants}
                >
                  <p className="fst-italic fs-5">"{testimonial.comment}"</p>
                </motion.blockquote>

                <motion.div className="text-center" variants={sectionVariants}>
                  <strong className="d-block fs-5 text-info">
                    {testimonial.name}
                  </strong>
                  <small className="text-light">{testimonial.role}</small>
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
