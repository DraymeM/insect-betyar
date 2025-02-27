import React from 'react';
import { Carousel } from 'react-bootstrap';

interface CarouselSectionProps {
  images: string[]; // Array of image URLs
  placeholderImage?: string; // Fallback image URL
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ images, placeholderImage }) => {

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}> {/* Adjust width and center the carousel */}
      <Carousel fade interval={3000} controls={true} indicators={false}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <Carousel.Item key={index} className="text-center"> {/* Center the image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%', // 16:9 aspect ratio (1920x1080)
                  overflow: 'hidden',
                  backgroundColor: 'lightgray', // Debugging: Add a background color to see if the container is rendered
                }}
              >
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Ensures the image covers the container without stretching
                  }}
                  onError={(e) => {
                    if (placeholderImage) {
                      e.currentTarget.src = placeholderImage; // Fallback to placeholder if image fails to load
                    }
                  }}
                />
              </div>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item className="text-center"> {/* Center the placeholder image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 aspect ratio (1920x1080)
                overflow: 'hidden',
                backgroundColor: 'lightgray', // Debugging: Add a background color to see if the container is rendered
              }}
            >
              <img
                className="d-block w-100"
                src={placeholderImage || ''}
                alt="Placeholder Slide"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default CarouselSection;