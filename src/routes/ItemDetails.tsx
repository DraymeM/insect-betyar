import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import './ItemDetails.css'; // Import custom CSS for animations

const placeholderImage = "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const ItemDetail: React.FC = () => {
  const { id } = useParams({ strict: false });
  const [item, setItem] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [maxSectionHeight, setMaxSectionHeight] = useState<number>(0);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch('/insect-betyar/data.json');
        const data = await response.json();
        const foundItem = data.find((i: { id: number }) => i.id.toString() === id);
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

  if (!item) return <p>Loading...</p>;

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '10vh' }}>
      <Row className="w-100 no-gutters">
        {/* Image Column */}
        <Col md={4} className="d-flex justify-content-center mb-4 mb-md-0" style={{ height: `${imgHeight}px` }}>
          <div style={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
            <img
              ref={imageRef}
              src={imgSrc}
              alt={item.name}
              onError={() => setImgSrc(placeholderImage)}
              className="img-fluid animate-pop-in"
              style={{ border: '2px solid #41d5f5', position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>

        {/* Details Column */}
        <Col md={8} className="d-flex flex-column justify-content-between text-center" style={{ height: `${imgHeight}px` }}>
          {/* Name Section */}
          <div className="p-3 animate-slide-in-left" style={{ border: '2px solid #41d5f5', backgroundColor: '#3d395c', height: `${maxSectionHeight * 0.2}px`, color: 'white' }}>
            <h3 style={{ fontSize: '1.3rem', margin: '0' }}>{item.name}</h3>
          </div>

          {/* Description Section */}
          <div className="p-3 animate-slide-in-right" style={{ border: '2px solid #41d5f5', backgroundColor: '#2b2a33', height: `${maxSectionHeight * 0.4}px`, color: 'white' }}>
            <p>{item.description}</p>
          </div>

          {/* Price Section */}
          <div className="p-3 animate-slide-in-left" style={{ border: '2px solid #41d5f5', height: `${maxSectionHeight * 0.2}px`, backgroundColor: '#2b2a33' }}>
            <p style={{ fontSize: '1.3rem', color: 'white' }}>Ár: {item.price} Ft</p>
          </div>

          {/* Back Button Section */}
          <div className="p-3 animate-slide-in-right" style={{ border: '2px solid #41d5f5', backgroundColor: '#2b2a33', height: `${maxSectionHeight * 0.2}px` }}>
            <div className="d-flex justify-content-center mt-3">
              <Link to="/about" className="btn btn-secondary animate-fade-in">
                <FaArrowLeft /> Vissza
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;