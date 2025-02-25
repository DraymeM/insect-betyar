import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Card from '../components/common/Card'; // Reuse the same Card component

const placeholderImage = "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const Home: React.FC = () => {
  const [latestItems, setLatestItems] = useState<any[]>([]);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  // Fetch the last 3 items from data.json
  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const response = await axios.get('/insect-betyar/data.json');
        const data = response.data;
        const lastThreeItems = data.slice(-3); // Get the last 3 items
        setLatestItems(lastThreeItems);
      } catch (error) {
        console.error('Error fetching latest items:', error);
      }
    };
    fetchLatestItems();
  }, []);



  return (
    <div className="page">


      {/* Latest Items Section */}
      <div className="section py-5">
        <Container>
          {/* Heading */}
          <h2 className="text-center mb-4">Latest Items</h2>

          {/* Cards */}
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
        </Container>
      </div>

      {/* Biography Section */}
      <Container className="section my-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
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
      </Container>
    </div>
  );
};

export default Home;