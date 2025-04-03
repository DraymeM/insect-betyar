import { Carousel } from "react-bootstrap";
import { SectionWrapper } from "../Section";

const carouselImages = [
  "https://www.termalfurdo.hu/upload/images/Galeria/cikk/ujpesti_lepkemuzeum/ujpesti_lepkemuzeum_termalfurdo_4.jpg",
  "https://csodalatosbalaton.hu/wp-content/uploads/2022/06/keszthely-muzeum-zoo-egzotikus-hullo-izelzlabu-csiga-kiallitas-csodalatosbalaton.jpg",
  "https://likebalaton.hu/wp-content/uploads/2022/06/5237230hullolepkemuzeumkeszthelymeszarosannarozsalikebalaton11.jpg",
];

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

export const CarouselSection = () => (
  <SectionWrapper>
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
  </SectionWrapper>
);
export default CarouselSection;
