import React, { useEffect, useState, Suspense } from "react";
import { fetchLatestItems } from "../../api/repo";
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
  const [latestItems, setLatestItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastThreeItems = await fetchLatestItems();
        setLatestItems(lastThreeItems);
      } catch (error) {
        console.error("Error fetching latest items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner />
        </div>
      }
    >
      <div className="mt-md-5 mb-md-5">
        <CarouselSection />
        <LatestItemsSection items={latestItems} isLoading={isLoading} />
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
          textClassName="text-white"
        />
        <TestimonialsSection testimonials={testimonials} />
      </div>
    </Suspense>
  );
};

export default Home;
