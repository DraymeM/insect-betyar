import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import Section from '../common/Section';
import CarouselSection from '../common/CarouselSection';
import { fetchLatestItems } from '../../api/repo';


const placeholderImage = "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const carouselImages = [
  'https://wallpaperaccess.com/full/109666.jpg',
  'https://www.pixelstalk.net/wp-content/uploads/2016/07/1920x1080-HD-Backgrounds.png',
  'https://i.pinimg.com/736x/50/c3/f2/50c3f2c9979af31532c11986715a2b09.jpg',
];

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const bioVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const carouselVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};

const navDotVariants = {
  hover: { scale: 1.2, transition: { duration: 0.3 } },
};

const Home: React.FC = () => {
  const [latestItems, setLatestItems] = useState<any[]>([]);

  const bioRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const HEADER_OFFSET = 60; // Adjust this based on your fixed header height

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastThreeItems = await fetchLatestItems();
        setLatestItems(lastThreeItems);

        // Apply scrollMarginTop to each section for better scroll behavior
        if (bioRef.current) bioRef.current.style.scrollMarginTop = `${HEADER_OFFSET}px`;
        if (itemsRef.current) itemsRef.current.style.scrollMarginTop = `${HEADER_OFFSET}px`;
        if (carouselRef.current) carouselRef.current.style.scrollMarginTop = `${HEADER_OFFSET}px`;
      } catch (error) {
        console.error('Error fetching latest items:', error);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const sectionTop = ref.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - HEADER_OFFSET, // Adjust for fixed header
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="page">
      {/* Navigation Dots */}
      <div className="section-nav">
        <motion.div
          className="nav-dot"
          onClick={() => scrollToSection(bioRef)}
          whileHover="hover"
          variants={navDotVariants}
          title="Biography"
        />
        <motion.div
          className="nav-dot"
          onClick={() => scrollToSection(itemsRef)}
          whileHover="hover"
          variants={navDotVariants}
          title="Latest Items"
        />
        <motion.div
          className="nav-dot"
          onClick={() => scrollToSection(carouselRef)}
          whileHover="hover"
          variants={navDotVariants}
          title="Carousel"
        />
      </div>

      {/* Biography Section */}
      <motion.div
        ref={bioRef}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section className="d-flex justify-content-center align-items-center">
          <Row className="align-items-center">
            <Col md={5} className="mb-4 mb-md-0">
              <motion.div
                variants={bioVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="biography-image-container"
              >
                <img
                  src="/images/biography.jpg"
                  alt="Biography"
                  className="biography-image"
                  onError={(e) => {
                    e.currentTarget.src = placeholderImage;
                  }}
                />
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div
                variants={bioVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2>About Me</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.
                </p>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Section>
      </motion.div>

      {/* Latest Items Section */}
      <motion.div
        ref={itemsRef}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section title="Legújabb termékeink">
          <Row className="justify-content-center g-4">
            {latestItems.map((item, index) => (
              <Col key={item.id} xs={12} md={6} lg={4} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card key={item.id} id={item.id} name={item.name} picture={item.picture} category={item.category}/>
                </motion.div>

              </Col>
            ))}
          </Row>
        </Section>
      </motion.div>

      {/* Carousel Section */}
      <motion.div
        ref={carouselRef}
        variants={carouselVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Section className="d-flex justify-content-center align-items-center">
          <CarouselSection images={carouselImages} placeholderImage={placeholderImage} />
        </Section>
      </motion.div>
    </div>
  );
};

export default Home;