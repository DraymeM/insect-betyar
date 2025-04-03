import React, { useEffect, useState } from "react";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import Card from "../common/Card";
import { fetchLatestItems } from "../../api/repo";
import Spinner from "../common/Spinner";
import { motion } from "framer-motion";

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";
const biographyImage = "/images/biography.jpg";

const carouselImages = [
  "https://www.termalfurdo.hu/upload/images/Galeria/cikk/ujpesti_lepkemuzeum/ujpesti_lepkemuzeum_termalfurdo_4.jpg",
  "https://csodalatosbalaton.hu/wp-content/uploads/2022/06/keszthely-muzeum-zoo-egzotikus-hullo-izelzlabu-csiga-kiallitas-csodalatosbalaton.jpg",
  "https://likebalaton.hu/wp-content/uploads/2022/06/5237230hullolepkemuzeumkeszthelymeszarosannarozsalikebalaton11.jpg",
];

const Home: React.FC = () => {
  const [latestItems, setLatestItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastThreeItems = await fetchLatestItems();
        setLatestItems(lastThreeItems);
      } catch (error) {
        console.error("Error fetching latest items:", error);
      }
    };
    fetchData();
  }, []);

  // Consistent animation variants for all sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  return (
    <div className="mt-md-5 mb-md-5">
      {/* Carousel with Opacity Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
        variants={sectionVariants}
      >
        <Carousel
          controls={true}
          indicators={true}
          className="w-100 mb-4"
          style={{ maxHeight: "60vh" }}
        >
          {carouselImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ height: "60vh", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.src = placeholderImage;
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </motion.div>

      {/* Latest Items Container with Consistent Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
        variants={sectionVariants}
      >
        <Container className="py-5 d-flex flex-column align-items-center bg-dark text-light rounded shadow-sm mb-5 mt-5">
          <motion.h2
            className="mb-4 text-uppercase fw-bold text-shadow"
            variants={sectionVariants}
          >
            Újdonságok
          </motion.h2>

          {latestItems.length === 0 ? (
            <Spinner />
          ) : (
            <motion.div
              className="d-flex flex-wrap justify-content-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {latestItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="position-relative"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <span
                    className="badge bg-danger position-absolute top-0 end-0 m-2 px-3 py-2 fs-6"
                    style={{
                      zIndex: 10,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Új
                  </span>
                  <Card
                    id={item.id}
                    name={item.name}
                    picture={item.picture}
                    category={item.category}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </motion.div>

      {/* Biography Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
        variants={sectionVariants}
      >
        <Container className="py-4 d-flex bg-dark text-light rounded shadow-sm mt-5">
          <Row className="align-items-center">
            <Col md={5} className="mb-4 mb-md-0">
              <motion.div
                variants={sectionVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <img
                  src={biographyImage}
                  alt="Biography"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "400px", width: "auto" }}
                  onError={(e) => {
                    e.currentTarget.src = placeholderImage;
                  }}
                />
              </motion.div>
            </Col>
            <Col md={6} className="mb-4 mb-md-0">
              <motion.div variants={sectionVariants}>
                <h2 className="mb-4">About Me</h2>
                <motion.p variants={sectionVariants}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </motion.p>
                <motion.p variants={sectionVariants}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </motion.p>
                <motion.p variants={sectionVariants}>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </motion.p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </div>
  );
};

export default Home;
