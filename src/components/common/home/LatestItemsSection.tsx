import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { SectionWrapper } from "../Section";
import Card from "../Card";
import Spinner from "../Spinner";

interface LatestItemsSectionProps {
  items: Array<{
    id: string;
    name: string;
    picture: string;
    category: string;
  }>;
  isLoading: boolean;
}

const sectionVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

export const LatestItemsSection = ({
  items,
  isLoading,
}: LatestItemsSectionProps) => (
  <SectionWrapper>
    <Container className="py-5 d-flex flex-column align-items-center bg-dark text-light rounded shadow-sm mb-5 mt-5">
      <motion.h2
        className="mb-4 text-uppercase fw-bold text-shadow"
        variants={sectionVariants}
      >
        Újdonságok
      </motion.h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <motion.div
          className="d-flex flex-wrap justify-content-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="position-relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <span
                className="badge bg-danger position-absolute top-0 end-0 m-2 px-3 py-2 fs-6"
                style={{
                  zIndex: 10,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                Új
              </span>
              <Card
                id={Number(item.id)}
                name={item.name}
                picture={item.picture}
                category={item.category}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  </SectionWrapper>
);

export default LatestItemsSection;
