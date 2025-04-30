'use client';

import HeroBanner from "@/components/home/HeroBanner";
import CategorySection from "@/components/home/CategorySection";
import TodayDeals from "@/components/home/TodayDeals";
import Sidebar from "@/components/layout/Sidebar";

export default function HomePage() {
  // Data mẫu cho category cards
  const categoryCards = [
    {
      id: "smart-watches",
      title: "Smart Watches",
      discount: "Save Up to 99€",
      imageUrl: "/images/smart-watch.png",
      buttonText: "Show Deals",
      buttonLink: "/category/smart-watches"
    },
    {
      id: "laptops",
      title: "Laptops",
      discount: "Save Up to 99€",
      imageUrl: "/images/laptop.png",
      buttonText: "Show Deals",
      buttonLink: "/category/laptops"
    },
    {
      id: "dji-products",
      title: "DJI Products",
      discount: "Save Up to 199€",
      imageUrl: "/images/drone.png",
      buttonText: "Show Deals",
      buttonLink: "/category/dji-products"
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 py-4">
          {/* Sidebar với danh mục */}
          <div className="w-full md:w-64 hidden md:block">
            <Sidebar />
          </div>
          
          {/* Phần nội dung chính */}
          <div className="flex-1">
            {/* Hero Banner với AirPods Pro */}
            <HeroBanner />
            
            {/* Category Cards Section */}
            <CategorySection categories={categoryCards} />
            
            {/* Today's Deals Section */}
            <TodayDeals />
          </div>
        </div>
      </div>
    </div>
  );
}