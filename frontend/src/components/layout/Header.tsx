"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaAngleDown } from "react-icons/fa";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Theo dõi scroll để tạo hiệu ứng sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryMouseEnter = (category: string) => {
    setActiveCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <header className={`w-full bg-white ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-md animate-fadeIn' : 'shadow-sm'}`}>
      {/* Top header with logo, search and icons */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-gray-700 p-1 hover:text-blue-500 transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle mobile menu"
          >
            <FaBars size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold group">
              <span className="text-gray-800 group-hover:text-blue-500 transition-colors">BIT</span>
              <span className="text-blue-500">EX</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 mx-10">
            <div className="relative w-full max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* User icons */}
          <div className="flex items-center space-x-5">
            <Link href="/account" className="text-gray-700 hover:text-blue-500 relative group">
              <FaUser size={20} />
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Account</span>
            </Link>
            <Link href="/wishlist" className="text-gray-700 hover:text-blue-500 relative group">
              <div className="relative">
                <FaHeart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </div>
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Wishlist</span>
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-500 relative group">
              <div className="relative">
                <FaShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile search bar - shown on small screens */}
        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className={`bg-white border-t border-b border-gray-200 ${isScrolled ? 'py-1' : 'py-0'}`}>
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex items-center space-x-1 py-1">
            <li className="relative py-2" 
                onMouseEnter={() => handleCategoryMouseEnter('all')} 
                onMouseLeave={handleCategoryMouseLeave}>
              <Link href="/category/all" className="flex items-center text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                <span className="mr-1">All Categories</span>
                <FaAngleDown className="text-xs ml-1" />
              </Link>
              
              {/* Mega menu for All Categories */}
              {activeCategory === 'all' && (
                <div className="absolute top-full left-0 w-screen max-w-4xl bg-white shadow-lg rounded-b-lg p-6 grid grid-cols-4 gap-4 z-50 border-t-2 border-blue-500 animate-fadeDown">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Computers</h3>
                    <ul className="space-y-1">
                      <li><Link href="/category/laptops" className="text-gray-600 hover:text-blue-500 text-sm">Laptops</Link></li>
                      <li><Link href="/category/desktops" className="text-gray-600 hover:text-blue-500 text-sm">Desktop PCs</Link></li>
                      <li><Link href="/category/monitors" className="text-gray-600 hover:text-blue-500 text-sm">Monitors</Link></li>
                      <li><Link href="/category/components" className="text-gray-600 hover:text-blue-500 text-sm">Components</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Mobile Devices</h3>
                    <ul className="space-y-1">
                      <li><Link href="/category/smartphones" className="text-gray-600 hover:text-blue-500 text-sm">Smartphones</Link></li>
                      <li><Link href="/category/tablets" className="text-gray-600 hover:text-blue-500 text-sm">Tablets</Link></li>
                      <li><Link href="/category/smartwatches" className="text-gray-600 hover:text-blue-500 text-sm">Smartwatches</Link></li>
                      <li><Link href="/category/accessories" className="text-gray-600 hover:text-blue-500 text-sm">Accessories</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Entertainment</h3>
                    <ul className="space-y-1">
                      <li><Link href="/category/tv" className="text-gray-600 hover:text-blue-500 text-sm">TVs</Link></li>
                      <li><Link href="/category/gaming" className="text-gray-600 hover:text-blue-500 text-sm">Gaming</Link></li>
                      <li><Link href="/category/audio" className="text-gray-600 hover:text-blue-500 text-sm">Audio</Link></li>
                      <li><Link href="/category/streaming" className="text-gray-600 hover:text-blue-500 text-sm">Streaming Devices</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Photography</h3>
                    <ul className="space-y-1">
                      <li><Link href="/category/cameras" className="text-gray-600 hover:text-blue-500 text-sm">Cameras</Link></li>
                      <li><Link href="/category/lenses" className="text-gray-600 hover:text-blue-500 text-sm">Lenses</Link></li>
                      <li><Link href="/category/drones" className="text-gray-600 hover:text-blue-500 text-sm">Drones</Link></li>
                      <li><Link href="/category/accessories" className="text-gray-600 hover:text-blue-500 text-sm">Accessories</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
            
            {/* Other navigation items */}
            <li><Link href="/category/computer" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Computer</Link></li>
            <li><Link href="/category/laptop" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Laptop</Link></li>
            <li><Link href="/category/mobile" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Mobile</Link></li>
            <li><Link href="/category/tv" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">TV</Link></li>
            <li><Link href="/category/gaming" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Gaming</Link></li>
            <li><Link href="/category/camera" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Camera</Link></li>
            <li><Link href="/category/tablet" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Tablet</Link></li>
            <li><Link href="/category/watch" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Watch</Link></li>
            
            {/* Special categories */}
            <li className="ml-auto bg-gray-100 rounded-md">
              <Link href="/pc-configuration" className="text-gray-600 hover:text-blue-500 px-3 py-2 block transition-colors">PC Configuration</Link>
            </li>
            <li className="bg-red-50 rounded-md">
              <Link href="/top-deals" className="text-red-500 hover:text-red-600 font-medium px-3 py-2 block transition-colors">Top Deals</Link>
            </li>
          </ul>

          {/* Mobile navigation menu */}
          {showMobileMenu && (
            <div className="md:hidden py-3 animate-fadeDown">
              <ul className="space-y-3">
                <li>
                  <Link href="/category/all" className="block text-gray-600 hover:text-blue-500 py-2">All Categories</Link>
                </li>
                <li>
                  <Link href="/category/computer" className="block text-gray-600 hover:text-blue-500 py-2">Computer</Link>
                </li>
                <li>
                  <Link href="/category/laptop" className="block text-gray-600 hover:text-blue-500 py-2">Laptop</Link>
                </li>
                <li>
                  <Link href="/category/mobile" className="block text-gray-600 hover:text-blue-500 py-2">Mobile</Link>
                </li>
                <li>
                  <Link href="/category/tv" className="block text-gray-600 hover:text-blue-500 py-2">TV</Link>
                </li>
                <li>
                  <Link href="/category/gaming" className="block text-gray-600 hover:text-blue-500 py-2">Gaming</Link>
                </li>
                <li>
                  <Link href="/category/camera" className="block text-gray-600 hover:text-blue-500 py-2">Camera</Link>
                </li>
                <li>
                  <Link href="/category/tablet" className="block text-gray-600 hover:text-blue-500 py-2">Tablet</Link>
                </li>
                <li>
                  <Link href="/category/watch" className="block text-gray-600 hover:text-blue-500 py-2">Watch</Link>
                </li>
                <li>
                  <Link href="/pc-configuration" className="block text-gray-600 hover:text-blue-500 py-2">PC Configuration</Link>
                </li>
                <li>
                  <Link href="/top-deals" className="block text-red-500 hover:text-red-600 font-medium py-2">Top Deals</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;