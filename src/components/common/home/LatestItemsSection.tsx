import { memo, useMemo, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { SectionWrapper } from "../Section";
import Card from "../Card";
import Spinner from "../Spinner";
import { fetchLatestItems } from "../../../api/repo";

// Define the type for the items
interface LatestItem {
  id: string;
  name: string;
  picture: string;
  price: string;
  category: string;
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.6,
    },
  },
};

const LatestItemsSection = memo(() => {
  const [latestItems, setLatestItems] = useState<LatestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchLatestItems();
        setLatestItems(items);
      } catch (error) {
        console.error("Error fetching latest items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsLoading(true); // Show loading state when the page becomes visible again
        fetchData(); // Re-fetch data when coming back to the page
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    fetchData(); // Initial fetch when the component mounts

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const renderedItems = useMemo(
    () =>
      latestItems.map((item) => (
        <motion.div
          key={item.id}
          className="position-relative"
          whileInView="visible"
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.1 }} // Trigger when 10% of the item is in view
        >
          <motion.span
            className="badge bg-danger position-absolute top-0 end-0 m-2 px-3 py-2 fs-6"
            style={{
              zIndex: 10,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
            variants={badgeVariants}
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
      )),
    [latestItems]
  );

  return (
    <SectionWrapper>
      <Container
        key={isLoading ? "loading" : "loaded"}
        className="pb-5 d-flex flex-column align-items-center bg-dark text-white rounded shadow-sm mt-5 py-2"
      >
        <motion.h2
          className="mb-4 text-uppercase bg-danger mb-5 w-100 text-center rounded fw-bold text-shadow py-2"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
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
            variants={containerVariants}
          >
            {renderedItems}
          </motion.div>
        )}
      </Container>
    </SectionWrapper>
  );
});

export default LatestItemsSection;
