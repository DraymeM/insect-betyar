import { memo, useState, useEffect, ReactNode } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { SectionWrapper } from "./Section";
import Card from "./Card";
import Spinner from "./Spinner";
import { useNavigate } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa";

interface Item {
  id: string | number;
  name: string;
  picture: string;
  price: string;
  category: string;
}

interface ItemSectionProps {
  title?: string;
  badgeText?: string;
  titleBg?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | `${string}-outline`;
  fetchFunction: () => Promise<Item[]>;
  icon?: ReactNode;
  button?: "link";
  buttonLink?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.5 },
  },
};

const ItemSection = memo(
  ({
    title = "Termékek",
    badgeText,
    titleBg = "danger",
    fetchFunction,
    button,
    buttonLink,
  }: ItemSectionProps) => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchFunction();
          setItems(data);
        } catch (error) {
          console.error("Error fetching items:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          fetchData(); // silent refresh
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () =>
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
    }, [fetchFunction]);

    const isOutline = titleBg?.endsWith("-outline");
    const baseColor = isOutline ? titleBg.replace("-outline", "") : titleBg;
    const textColorClass = isOutline ? `text-${baseColor}` : "text-white";
    const bgColorClass = isOutline ? "bg-transparent" : `bg-${baseColor}`;
    const titleAlignment = isOutline ? "text-start ps-2" : "text-center";
    const underlineStyle = isOutline
      ? {
          borderBottom: `4px solid var(--bs-${baseColor})`,
          width: "100%",
          marginBottom: "1rem",
        }
      : {};

    return (
      <SectionWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <Container className="pb-5 d-flex flex-column align-items-center bg-dark text-white rounded shadow-sm mt-5 py-2">
            <h2
              className={`mb-4 mb-5 w-100 rounded fw-bold text-shadow py-2 ${bgColorClass} ${textColorClass} ${titleAlignment}`}
              style={underlineStyle}
            >
              <span className="d-inline-flex align-items-center gap-2">
                {title}
              </span>
            </h2>

            {isLoading ? (
              <Spinner />
            ) : (
              <div className="d-flex flex-wrap justify-content-center gap-4">
                {items.map((item) => (
                  <div key={item.id} className="position-relative">
                    {badgeText && (
                      <span
                        className="badge bg-danger position-absolute top-0 end-0 m-2 px-3 py-2 fs-6"
                        style={{
                          zIndex: 10,
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {badgeText}
                      </span>
                    )}
                    <Card
                      id={Number(item.id)}
                      name={item.name}
                      picture={item.picture}
                      category={item.category}
                      price={item.price}
                    />
                  </div>
                ))}
              </div>
            )}

            {button === "link" && buttonLink && (
              <div className="d-flex justify-content-center mt-4">
                <button
                  className={`btn btn-${baseColor} rounded mt-2 px-4 py-2 fw-bold`}
                  onClick={() => navigate({ to: buttonLink })}
                >
                  Részletek <FaArrowRight />
                </button>
              </div>
            )}
          </Container>
        </motion.div>
      </SectionWrapper>
    );
  }
);

export default ItemSection;
