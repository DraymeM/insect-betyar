import React, { Suspense } from "react";
import Spinner from "../common/Spinner";
const CarouselSection = React.lazy(
  () => import("../common/home/CarouselSection")
);
const LatestItemsSection = React.lazy(
  () => import("../common/home/LatestItemsSection")
);
const CatAItemSection = React.lazy(
  () => import("../common/home/ChategoryAItemsSection")
);
const BiographySection = React.lazy(
  () => import("../common/home/BiographySection")
);
const HighlightItemSection = React.lazy(
  () => import("../common/HighlightItemSection")
);
const HeroSection = React.lazy(() => import("../common/home/HeroSection"));
import { TestimonialsSection } from "../common/home/TestimonialsSection";

const Home: React.FC = () => {
  const testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Art Collector",
      comment:
        "The quality of these pieces exceeded my expectations. The shipping was fast and the packaging was secure.",
      imageUrl:
        "https://media.istockphoto.com/id/486721100/photo/extreme-sharp-closeup-of-wasp-head.jpg?s=612x612&w=0&k=20&c=bWEwuM2RKHEZfQZ6o8e--T6a0ExIbLGIXBBNyPozbHY=",
      rating: 5,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Museum Curator",
      comment:
        "Impressive collection with authentic pieces. Our visitors loved the exhibition featuring items from this gallery.",
      imageUrl:
        "https://images.pexels.com/photos/9927833/pexels-photo-9927833.jpeg",
      rating: 4,
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      role: "History Teacher",
      comment:
        "Perfect for educational purposes. My students were fascinated by the historical artifacts we acquired.",
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/praying-mantis-amazing-insects-1595937972.jpg?crop=0.671xw:1.00xh;0.178xw,0&resize=640:*",
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
        <HeroSection />
        <div id="latest-items">
          <LatestItemsSection />
        </div>
        <div className="container mt-5">
          <div className="row">
            <HighlightItemSection
              itemId={1}
              title="🔝 Legjobb választás"
              titleBg="primary-outline"
              buttonLink="/about/category/Category A/item/1"
            />
            <HighlightItemSection
              itemId={2}
              title="✅ Kedvencem"
              titleBg="success-outline"
              buttonLink="/about/category/Category B/item/2"
            />
          </div>
        </div>
        <CatAItemSection />
        <div className="container mt-5">
          <div className="row">
            <HighlightItemSection
              itemId={1}
              title="⭐ Népszerű"
              titleBg="warning-outline"
              buttonLink="/about/category/Category A/item/1"
            />
            <HighlightItemSection
              itemId={41}
              title="🔥 Régóta várt"
              titleBg="danger-outline"
              buttonLink="/about/category/Category C/item/41"
            />
            <HighlightItemSection
              itemId={1}
              title="🌴 Egyenesen Costa-Ricaból"
              titleBg="success-outline"
              buttonLink="/about/category/Category A/item/1"
            />
            <HighlightItemSection
              itemId={41}
              title="🚘 Balkánról"
              titleBg="info-outline"
              buttonLink="/about/category/Category C/item/41"
            />
          </div>
        </div>

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
