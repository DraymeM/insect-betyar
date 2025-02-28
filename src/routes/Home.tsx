//src/routes/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col,} from 'react-bootstrap';
import Card from '../components/common/Card';
import Section from '../components/common/Section';
import CarouselSection from '../components/common/CarouselSection';
import { fetchLatestItems } from '../api/repo';

const placeholderImage = "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const carouselImages = [
  'data:image/jpeg;base64,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',
  'https://img.goodfon.com/original/1920x1080/3/9c/space-planet-landscape-wallpapers-1920-x-1080.jpg',
  'https://wallpaperaccess.com/full/109666.jpg',
];
const Home: React.FC = () => {
  const [latestItems, setLatestItems] = useState<any[]>([]);

  // Fetch the last 3 items from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastThreeItems = await fetchLatestItems();
        setLatestItems(lastThreeItems);
      } catch (error) {
        console.error('Error fetching latest items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="page">
      
      {/* Biography Section */}
      <Section className="d-flex justify-content-center align-items-center">
        <Row className="align-items-center">
          <Col md={5} className="mb-4 mb-md-0">
            <div className="biography-image-container">
              <img
                src="/images/biography.jpg"
                alt="Biography"
                className="img-fluid rounded biography-image"
                onError={(e) => {
                  e.currentTarget.src = placeholderImage; // Fallback to placeholder if image fails to load
                }}
              />
            </div>
          </Col>
          <Col md={6}>
            <h2>About Me</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae elit libero, a pharetra augue. Donec id elit non mi porta
              gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
              tortor mauris condimentum nibh, ut fermentum massa justo sit amet
              risus.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Donec sed odio
              dui. Aenean lacinia bibendum nulla sed consectetur. Donec id elit
              non mi porta gravida at eget metus.
            </p>
          </Col>
        </Row>
      </Section>
      {/* Latest Items Section */}
      <Section title="Latest Items">
        <Row className="justify-content-center g-4">
          {latestItems.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4} className="mb-4">
              <Card
                id={item.id}
                name={item.name}
                picture={item.picture}
              />
            </Col>
          ))}
        </Row>
      </Section>

      {/* Carousel Section */}
      <Section className="d-flex justify-content-center align-items-center">
        <CarouselSection images={carouselImages} placeholderImage={placeholderImage} />
      </Section>

    </div>
  );
};

export default Home;