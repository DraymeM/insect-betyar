import React, { Suspense } from "react";
import Spinner from "../common/Spinner";
const CarouselSection = React.lazy(
  () => import("../common/home/CarouselSection")
);
const LatestItemsSection = React.lazy(
  () => import("../common/home/LatestItemsSection")
);
const BiographySection = React.lazy(
  () => import("../common/home/BiographySection")
);
import { TestimonialsSection } from "../common/home/TestimonialsSection";

const Home: React.FC = () => {
  const testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Art Collector",
      comment:
        "The quality of these pieces exceeded my expectations. The shipping was fast and the packaging was secure.",
      imageUrl: "https://randomuser.me/api/portraits/women/43.jpg",
      rating: 5,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Museum Curator",
      comment:
        "Impressive collection with authentic pieces. Our visitors loved the exhibition featuring items from this gallery.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      role: "History Teacher",
      comment:
        "Perfect for educational purposes. My students were fascinated by the historical artifacts we acquired.",
      imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
    },
  ];

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner />
        </div>
      }
    >
      <div className="mt-md-5 mb-md-5 w-full flex-grow-2">
        <CarouselSection />
        <LatestItemsSection />
        <BiographySection
          imageUrl="/images/about.jpg"
          title="Our Story"
          paragraphs={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ]}
        />
        <BiographySection
          mode="mirrored"
          imageUrl="/images/team.jpg"
          title="Meet the Team"
          paragraphs={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ]}
          textClassName="text-light"
        />
        <TestimonialsSection testimonials={testimonials} />
      </div>
    </Suspense>
  );
};

export default Home;
