import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "@tanstack/react-router";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import CartButton from "../common/CartButton";

const placeholderImage =
  "https://www.museumselection.co.uk/images/products/large/28889.jpg";

const ItemDetail: React.FC = () => {
  const { id, category } = useParams({ strict: false });
  const location = useLocation();
  const [item, setItem] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState<string>("");

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

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
    <Tooltip id={`tooltip-${text}`} className="bg-dark text-light">
      {text}
    </Tooltip>
  );

  if (!item)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="info" />
      </div>
    );

  return (
    <Container className="py-5">
      {/* Top: Image + Details */}
      <Row className="g-4 mb-4 mt-2">
        <Col lg={6}>
          <motion.div
            className="rounded shadow overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="d-flex align-items-center justify-content-center bg-white"
              style={{ height: "30rem" }}
            >
              <img
                src={imgSrc}
                onError={() => setImgSrc(placeholderImage)}
                alt={item.name}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </motion.div>
        </Col>
        <Col lg={6}>
          <motion.div
            className="bg-dark text-light p-4 rounded shadow h-100 d-flex flex-column justify-content-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Item Name and Price Left-Aligned */}
            <div>
              <h3 className="border-bottom border-secondary pb-2 mb-4">
                {item.name}
              </h3>
              {/* Price left-aligned with larger font size and bold */}
              <p className="fs-2 fw-bold mb-4">
                <span>Ár:</span>{" "}
                <span className=" text-info fs-1">{item.price} Ft</span>
              </p>
            </div>

            <CartButton />
          </motion.div>
        </Col>
      </Row>

      {/* Bottom: Description */}
      <motion.div
        className="bg-dark p-4 rounded shadow position-relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h5 className="text-secondary fw-bold border-bottom border-secondary mb-3">
          Leírás
        </h5>
        <p className="text-light mb-0" style={{ whiteSpace: "pre-line" }}>
          {item.description || "Nincs leírás elérhető ehhez az elemhez."}
        </p>

        {/* Vissza Button - Positioned bottom-right inside the description box */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            zIndex: 999,
          }}
        >
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip("Vissza a kategóriához")}
          >
            <Link
              to={`/about/category/${category}?page=${page}&limit=${limit}`}
              className="text-decoration-none"
            >
              <Button className="btn btn-dark border border-secondary text-light d-inline-flex align-items-center">
                <FaArrowLeft className="me-2" />
                Vissza
              </Button>
            </Link>
          </OverlayTrigger>
        </div>
      </motion.div>
    </Container>
  );
};

export default ItemDetail;
