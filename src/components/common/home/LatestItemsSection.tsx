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
    price: string;
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
      duration: 0.2,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: -1 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.9,
      duration: 0.8,
    },
  },
};

export const LatestItemsSection = ({
  items,
  isLoading,
}: LatestItemsSectionProps) => (
  <SectionWrapper>
    <Container className="pb-5 d-flex flex-column align-items-center bg-dark text-white rounded shadow-sm mt-5 py-2">
      <motion.h2
        className="mb-4 text-uppercase bg-danger  mb-5 w-100 text-center rounded fw-bold text-shadow py-2"
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
                staggerChildren: 0.6, // Stagger each child card animation
              },
            },
          }}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="position-relative"
              whileInView="visible"
              viewport={{ once: true, margin: "-1px" }}
            >
              <motion.span
                className="badge bg-danger position-absolute top-0 end-0 m-2 px-3 py-2 fs-6"
                style={{
                  zIndex: 10,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                }}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
              >
                Új
              </motion.span>
              <Card
                id={Number(item.id)}
                name={item.name}
                picture={item.picture}
                category={item.category}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  </SectionWrapper>
);

export default LatestItemsSection;
