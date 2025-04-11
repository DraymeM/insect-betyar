import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "@tanstack/react-router";
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
import { useCart } from "../../context/CartContext";

const placeholderImage =
  "https://www.museumselection.co.uk/images/products/large/28889.jpg";

const ItemDetail: React.FC = () => {
  const { id, category } = useParams({ strict: false });
  const location = useLocation();
  const [item, setItem] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState<string>(placeholderImage);
  const { dispatch } = useCart();
  const [pending, setPending] = useState(false); // Pending state for async Add to Cart
  const [isLoading, setIsLoading] = useState(true); // Loading state for item data

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
        setIsLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching item:", error);
        setIsLoading(false); // Stop loading on error
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    setPending(true); // Start the pending state (show spinner)

    // Simulate async delay for adding to cart
    await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms delay

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        picture: item.picture,
        price: item.price,
      },
    });
    setPending(false); // Stop the spinner
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (!item) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div>No item found.</div>
      </div>
    );
  }

  return (
    <Container className="py-5">
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
              style={{ height: "30rem", position: "relative" }}
            >
              {/* Item Image */}
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
            className="bg-dark text-light p-4 rounded shadow h-100 d-flex flex-column justify-content-between position-relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Overlay Spinner in Details Section */}
            {pending && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark"
                style={{
                  zIndex: 10,
                  opacity: 0.7,
                }}
              >
                <Spinner animation="border" variant="info" />
              </div>
            )}

            <div>
              <h3 className="border-bottom border-secondary pb-2 mb-4">
                {item.name}
              </h3>
              <p className="fs-2 fw-bold mb-4">
                <span>Ár:</span>{" "}
                <span className="text-info fs-1">{item.price} Ft</span>
              </p>
            </div>

            <CartButton onClick={handleAddToCart} pending={pending} />
          </motion.div>
        </Col>
      </Row>

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
            overlay={<Tooltip id="tooltip-back">Vissza a kategóriához</Tooltip>}
          >
            <Link
              to={`/about/category/${category}?page=${page}&limit=${limit}`}
              className="text-decoration-none"
            >
              <Button className="btn btn-dark border border-secondary text-light d-inline-flex align-items-center">
                <FaArrowLeft className="me-2" /> Vissza
              </Button>
            </Link>
          </OverlayTrigger>
        </div>
      </motion.div>
    </Container>
  );
};

export default ItemDetail;
