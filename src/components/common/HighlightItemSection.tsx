import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "@tanstack/react-router";
import { fetchItemById } from "../../api/repo";
import { FaArrowRight } from "react-icons/fa";

interface HighlightItemSectionProps {
  itemId: number | string;
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
  buttonText?: string;
  buttonLink?: string;
}

const placeholderImage =
  "https://www.museumselection.co.uk/images/products/large/28889.jpg";

// Fade In / Out Animation
const fadeInOut = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.5 } }, // When leaving the viewport
};

const HighlightItemSection: React.FC<HighlightItemSectionProps> = ({
  itemId,
  title = "Kiemelt",
  badgeText,
  titleBg = "danger",
  buttonText = "Részletek",
  buttonLink = "/",
}) => {
  const [item, setItem] = useState<any>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchItemById(itemId).then(setItem);
  }, [itemId]);

  if (!item) return null;

  return (
    <motion.div
      variants={fadeInOut}
      initial="hidden"
      whileInView="visible"
      exit="exit" // Trigger exit animation when leaving the viewport
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="col-md-6 col-lg-6 mb-4"
    >
      <Container className="bg-dark text-white p-3 rounded shadow-sm h-100">
        <h3
          className={`rounded fw-bold py-2 ${bgColorClass} ${textColorClass} ${titleAlignment}`}
          style={underlineStyle}
        >
          {title}
        </h3>

        {badgeText && (
          <span className="badge bg-danger mb-3 d-block">{badgeText}</span>
        )}

        <div className="d-flex flex-column flex-md-row gap-3 align-items-stretch">
          {/* Left: Image (50% on md+) */}
          <div className="text-center w-100 w-md-50">
            <img
              src={item.picture}
              alt={item.name}
              className="img-fluid rounded w-100"
              style={{ maxHeight: "250px", objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = placeholderImage;
              }}
            />
          </div>

          {/* Right: Info (50% on md+) */}
          <div className="d-flex flex-column justify-content-between text-md-center text-center w-100 w-md-50">
            <div>
              <h4 className="text-light fw-bold">{item.name}</h4>
              <p className="fs-5 mt-md-5 text-info">{item.price} Ft</p>
            </div>
            <div>
              <Button
                variant={baseColor}
                className="fw-bold d-inline-flex align-items-center gap-2 mt-3"
                onClick={() => navigate({ to: buttonLink })}
              >
                {buttonText} <FaArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default HighlightItemSection;
