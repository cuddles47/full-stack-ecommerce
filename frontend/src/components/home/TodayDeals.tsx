"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

// Dữ liệu mẫu cho danh sách sản phẩm khuyến mãi
const dealsData = [
  {
    id: 1,
    name: 'Samsung Galaxy Watch 5',
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    rating: 4.8,
    imageUrl: '/images/galaxy-watch.png',
    href: '/product/samsung-galaxy-watch-5',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: 999.99,
    originalPrice: 1199.99,
    discount: 17,
    rating: 4.9,
    imageUrl: '/images/macbook-air.png',
    href: '/product/macbook-air-m2',
    badge: 'New'
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 Headphones',
    price: 349.99,
    originalPrice: 399.99,
    discount: 13,
    rating: 4.7,
    imageUrl: '/images/sony-headphones.png',
    href: '/product/sony-wh-1000xm5',
  },
  {
    id: 4,
    name: 'iPad Pro 11"',
    price: 799.99,
    originalPrice: 899.99,
    discount: 11,
    rating: 4.9,
    imageUrl: '/images/ipad-pro.png',
    href: '/product/ipad-pro-11',
    badge: 'Limited'
  },
  {
    id: 5,
    name: 'DJI Mini 3 Pro',
    price: 749.99,
    originalPrice: 849.99,
    discount: 12,
    rating: 4.6,
    imageUrl: '/images/dji-mini.png',
    href: '/product/dji-mini-3-pro',
  },
  {
    id: 6,
    name: 'Samsung 55" QLED TV',
    price: 849.99,
    originalPrice: 999.99,
    discount: 15,
    rating: 4.8,
    imageUrl: '/images/samsung-tv.png',
    href: '/product/samsung-qled-tv',
    badge: 'Top Rated'
  },
];

const TodayDeals = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({});

  // Tính toán max scroll
  useEffect(() => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      setMaxScroll(scrollWidth - clientWidth);
    }
  }, []);

  // Thiết lập Intersection Observer để kiểm tra khi sản phẩm hiển thị
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = parseInt(entry.target.id.split('-')[1]);
        setIsVisible(prev => ({
          ...prev,
          [id]: entry.isIntersecting
        }));
      });
    }, options);

    // Quan sát các phần tử sản phẩm
    const productElements = document.querySelectorAll('.product-card');
    productElements.forEach(el => observer.observe(el));

    return () => {
      productElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      
      if (direction === 'left') {
        const newPosition = Math.max(0, scrollPosition - scrollAmount);
        sliderRef.current.scrollTo({
          left: newPosition,
          behavior: 'smooth'
        });
        setScrollPosition(newPosition);
      } else {
        const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
        sliderRef.current.scrollTo({
          left: newPosition,
          behavior: 'smooth'
        });
        setScrollPosition(newPosition);
      }
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i}
          className={`${i <= rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`}
        />
      );
    }
    return stars;
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Today's Deals</h2>
          <p className="text-gray-600">Get amazing deals before they're gone</p>
        </div>
        <Link href="/deals" className="text-blue-500 hover:underline text-sm flex items-center">
          View all <span className="ml-1">→</span>
        </Link>
      </div>

      <div className="relative">
        {/* Navigation arrows */}
        <button
          onClick={() => scroll('left')}
          className={`absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10 
            hover:bg-gray-100 transition-opacity ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          disabled={scrollPosition <= 0}
          aria-label="Previous products"
        >
          <FaArrowLeft className={`${scrollPosition <= 0 ? 'text-gray-300' : 'text-gray-700'}`} />
        </button>

        {/* Products slider */}
        <div 
          ref={sliderRef}
          className="flex space-x-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dealsData.map((product) => (
            <div 
              key={product.id}
              id={`product-${product.id}`}
              className={`product-card min-w-[280px] bg-white border border-gray-200 rounded-lg overflow-hidden 
                flex flex-col transition-all duration-500 group hover:shadow-xl ${isVisible[product.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {/* Badge if product has one */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
              
              {/* Product image */}
              <Link href={product.href} className="block p-4 relative bg-gray-50">
                <div className="absolute top-0 right-3 p-2">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <FaHeart />
                  </button>
                </div>
                <div className="relative h-48 mb-4 mx-auto transition-transform group-hover:scale-105 duration-300">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Link>
              
              {/* Product info */}
              <div className="p-4 flex-grow">
                <Link href={product.href} className="block">
                  <h3 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-blue-600">{product.name}</h3>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  </div>
                </Link>
              </div>
              
              {/* Add to cart button */}
              <div className="border-t border-gray-100">
                <button className="w-full py-3 text-blue-600 font-medium hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right navigation arrow */}
        <button
          onClick={() => scroll('right')}
          className={`absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10 
            hover:bg-gray-100 transition-opacity ${scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          disabled={scrollPosition >= maxScroll}
          aria-label="Next products"
        >
          <FaArrowRight className={`${scrollPosition >= maxScroll ? 'text-gray-300' : 'text-gray-700'}`} />
        </button>
      </div>
      
      {/* Scroll progress indicator */}
      <div className="w-full bg-gray-200 h-1 mt-4 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0}%` }}
        ></div>
      </div>
    </section>
  );
};

export default TodayDeals;