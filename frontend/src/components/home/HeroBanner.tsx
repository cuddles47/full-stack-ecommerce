"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Dữ liệu mẫu cho banner - giữ nguyên
const bannerData = [
  {
    id: 1,
    title: "AIRPODS PRO",
    subtitle: "Just for today!",
    description: "Active Noise Cancellation for immersive sound. Transparency mode for hearing what's happening around you.",
    buttonText: "Shop now!",
    buttonLink: "/product/airpods-pro",
    imagePath: "/images/airpods-pro.png",
    bgColor: "from-gray-900 to-black"
  },
  {
    id: 2,
    title: "MACBOOK PRO",
    subtitle: "Premium performance",
    description: "Supercharged by M2 Pro or M2 Max. The most powerful chips ever in a laptop.",
    buttonText: "Discover",
    buttonLink: "/product/macbook-pro",
    imagePath: "/images/macbook-pro.png", 
    bgColor: "from-blue-900 to-blue-700"
  },
  {
    id: 3,
    title: "IPHONE 15",
    subtitle: "The ultimate phone",
    description: "Featuring the groundbreaking Apple Intelligence and a powerful camera system.",
    buttonText: "Learn more",
    buttonLink: "/product/iphone-15",
    imagePath: "/images/iphone-15.png",
    bgColor: "from-indigo-900 to-purple-800"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Điều khiển chuyển slide
  const changeSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    // Đặt timeout để tắt hiệu ứng sau khi animation hoàn thành
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 600); // 600ms là thời gian của animation
  };

  // Chuyển đến slide trước
  const prevSlide = () => {
    const newIndex = currentSlide === 0 ? bannerData.length - 1 : currentSlide - 1;
    changeSlide(newIndex);
  };

  // Chuyển đến slide kế tiếp
  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % bannerData.length;
    changeSlide(newIndex);
  };

  // Auto slideshow
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        const newIndex = (currentSlide + 1) % bannerData.length;
        changeSlide(newIndex);
      }, 6000);
    };

    startAutoPlay();
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [currentSlide]);

  return (
    <div className="relative h-96 md:h-[450px] rounded-lg overflow-hidden mb-8 group">
      {/* Banner slides */}
      {bannerData.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} transition-transform duration-700 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 translate-x-0" 
              : index < currentSlide 
                ? "opacity-0 -translate-x-full" 
                : "opacity-0 translate-x-full"
          }`}
        >
          <div className="container mx-auto h-full flex items-center">
            {/* Text content */}
            <div className="w-full md:w-1/2 px-6 text-white">
              <h3 className="text-lg md:text-xl font-medium mb-1 text-blue-300">{banner.subtitle}</h3>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{banner.title}</h2>
              <p className="hidden md:block text-lg mb-6 max-w-md text-gray-200">{banner.description}</p>
              <Link 
                href={banner.buttonLink} 
                className="inline-flex items-center bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition-colors"
              >
                {banner.buttonText}
                <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
            
            {/* Image container */}
            <div className="hidden md:block w-1/2 h-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[340px] h-[340px] transition-transform duration-700 hover:scale-105">
                  <Image 
                    src={banner.imagePath}
                    alt={banner.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    className="drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white rounded-full p-2 shadow-lg z-10 transition-all opacity-0 group-hover:opacity-100"
        disabled={isAnimating}
        aria-label="Previous slide"
      >
        <FaArrowLeft size={16} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white rounded-full p-2 shadow-lg z-10 transition-all opacity-0 group-hover:opacity-100"
        disabled={isAnimating}
        aria-label="Next slide"
      >
        <FaArrowRight size={16} />
      </button>
      
      {/* Dots navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            disabled={isAnimating}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs hidden md:block">
        <span className="font-medium">{currentSlide + 1}</span>
        <span className="mx-1">/</span>
        <span>{bannerData.length}</span>
      </div>
    </div>
  );
};

export default HeroBanner;