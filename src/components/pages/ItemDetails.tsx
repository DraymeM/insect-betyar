import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation } from "@tanstack/react-router";
import { Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const placeholderImage =
  "https://www.museumselection.co.uk/images/products/large/28889.jpg";

const ItemDetail: React.FC = () => {
  const { id, category } = useParams({ strict: false });
  const location = useLocation();
  const [item, setItem] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch("/insect-betyar/data.json");
        const data = await response.json();
        const foundItem = data.find(
          (i: { id: number }) => i.id.toString() === id
        );
        setItem(foundItem);
        setImgSrc(foundItem?.picture || placeholderImage);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  const renderTooltip = (text: string) => (
    <Tooltip
      id={`tooltip-${text.toLowerCase().replace(" ", "-")}`}
      className="bg-dark text-light"
    >
      {text}
    </Tooltip>
  );

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  if (!item)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-info" role="status"></div>
      </div>
    );

  return (
    <>
      <Container className="mt-10 py-5">
        {/* Image and Details Section */}

        <Container
          className="d-flex flex-column flex-lg-row wrap-md justify-content-center align-items-center mt-5 mb-5"
          style={{ maxWidth: "62rem" }}
        >
          {/* Image Section */}
          <motion.div
            style={{
              width: "100%",
              maxWidth: "30rem", // Set the max width to match the description section
              paddingTop: "30rem", // 1:1 Aspect Ratio
              position: "relative",
              marginBottom: "1rem",
              display: "flex-wrap",
              margin: "1rem",
              flexShrink: 0,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          >
            <img
              ref={imageRef}
              src={imgSrc}
              alt={item.name}
              onError={() => setImgSrc(placeholderImage)}
              className="img-fluid shadow-lg rounded"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="bg-dark text-light p-4 rounded-4 text-center"
            style={{
              width: "100%",
              maxWidth: "30rem", // Match the max width of the description section
              height: "30rem", // Match image height
              flexShrink: 0,
              display: "flex wrap",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Item Name */}
            <motion.h3
              className="fw-bold text-light border border-secondary rounded w-100 py-2 mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {item.name}
            </motion.h3>

            {/* Price */}
            <motion.h4
              className="text-info mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="fs-5 p-2">{item.price} Ft</span>
            </motion.h4>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip("Vissza a kategoriához")}
              >
                <Link
                  to={`/about/category/${category}?page=${page}&limit=${limit}`}
                  className="text-decoration-none"
                >
                  <Button variant="outline-light" className="px-4 py-2 mt-20">
                    <FaArrowLeft className="me-2" /> Vissza
                  </Button>
                </Link>
              </OverlayTrigger>
            </motion.div>
          </motion.div>
        </Container>
        {/* Description Section */}
        <Container style={{ marginTop: 0, maxWidth: "62rem" }}>
          {" "}
          {/* Ensure maxWidth here matches */}
          <motion.div
            className="bg-dark text-light p-4 rounded-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-left border border-secondary rounded px-1 mb-4">
              Leírás
            </h1>
            <motion.p
              className="px-3 text-justify border border-secondary py-5 rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {item.description}
            </motion.p>
          </motion.div>
        </Container>
      </Container>
    </>
  );
};

export default ItemDetail;
