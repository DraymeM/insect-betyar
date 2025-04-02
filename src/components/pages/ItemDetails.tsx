import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation } from "@tanstack/react-router";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemDetails.css";

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const ItemDetail: React.FC = () => {
  const { id, category } = useParams({ strict: false });
  const location = useLocation();
  const [item, setItem] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [maxSectionHeight, setMaxSectionHeight] = useState<number>(0);
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

  useEffect(() => {
    if (imageRef.current) {
      setImgHeight(imageRef.current.offsetHeight);
    }
  }, [imgSrc]);

  useEffect(() => {
    if (imgHeight) {
      setMaxSectionHeight(imgHeight);
    }
  }, [imgHeight]);

  if (!item)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }} // Full screen height
      >
        <div className="spinner-border text-info" role="status"></div>
      </div>
    );

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

  return (
    <Container
      className="mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh", marginTop: "10vh" }}
    >
      <Row className="w-100 no-gutters">
        <Col
          md={4}
          className="d-flex justify-content-center mb-4 mb-md-0"
          style={{ height: `${imgHeight}px` }}
        >
          <div
            style={{ width: "100%", paddingTop: "100%", position: "relative" }}
          >
            <img
              ref={imageRef}
              src={imgSrc}
              alt={item.name}
              onError={() => setImgSrc(placeholderImage)}
              className="img-fluid animate-pop-in shadow-lg"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>

        <Col
          md={8}
          className="d-flex flex-column justify-content-between text-center"
          style={{ height: `${imgHeight}px` }}
        >
          <div
            className="p-3 animate-slide-in-left bg-dark text-info border border-2 border-info"
            style={{ height: `${maxSectionHeight * 0.2}px` }}
          >
            <h3 className="mb-0 fw-bold">{item.name}</h3>
          </div>

          <div
            className="p-3 animate-slide-in-right bg-dark text-light border border-2 border-info overflow-auto w-100"
            style={{ height: `${maxSectionHeight * 0.4}px` }}
          >
            <p className="mb-0">{item.description}</p>
          </div>

          <div
            className="p-3 animate-slide-in-left bg-dark text-info border border-2 border-info"
            style={{ height: `${maxSectionHeight * 0.2}px` }}
          >
            <Badge bg="info" className="fs-5 p-2">
              {item.price} Ft
            </Badge>
          </div>

          <div
            className="p-3 animate-slide-in-right bg-dark border border-2 border-info d-flex align-items-center justify-content-center"
            style={{ height: `${maxSectionHeight * 0.2}px` }}
          >
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip("Vissza a kategoriához")}
            >
              <Link
                to={`/about/category/${category}?page=${page}&limit=${limit}`}
                className="text-decoration-none"
              >
                <Button
                  variant="outline-light"
                  className="animate-fade-in px-4 py-2"
                >
                  <FaArrowLeft className="me-2" /> Vissza
                </Button>
              </Link>
            </OverlayTrigger>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;
