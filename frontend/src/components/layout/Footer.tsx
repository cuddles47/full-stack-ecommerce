"use client";
import Link from 'next/link';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Portfolio notice banner */}
      <div className="bg-blue-500 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-3">This website was created for portfolio purposes and is NOT a real business.</p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-500 py-1 px-4 rounded-md flex items-center hover:bg-gray-100 transition-colors"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </Link>
            <Link 
              href="mailto:contact@example.com" 
              className="bg-white text-blue-500 py-1 px-4 rounded-md flex items-center hover:bg-gray-100 transition-colors"
            >
              <FaEnvelope className="mr-2" /> Email
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer - có thể bổ sung thêm nếu cần */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-bold mb-4">BitEx</h3>
              <p className="text-sm text-gray-400">
                Your one-stop shop for all electronics and gadgets. We offer a wide range of products at competitive prices.
              </p>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/category/computers" className="text-sm text-gray-400 hover:text-white">Computers & Laptops</Link></li>
                <li><Link href="/category/tablets" className="text-sm text-gray-400 hover:text-white">Tablets</Link></li>
                <li><Link href="/category/smartphones" className="text-sm text-gray-400 hover:text-white">Smartphones</Link></li>
                <li><Link href="/category/cameras" className="text-sm text-gray-400 hover:text-white">Cameras</Link></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/shipping" className="text-sm text-gray-400 hover:text-white">Shipping Information</Link></li>
                <li><Link href="/returns" className="text-sm text-gray-400 hover:text-white">Returns & Exchanges</Link></li>
                <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="text-sm text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} BitEx. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;