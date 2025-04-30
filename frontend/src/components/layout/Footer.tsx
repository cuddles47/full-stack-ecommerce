'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">KIWEY</h3>
            <p className="text-gray-300 mb-4">Chúng tôi cung cấp các sản phẩm chất lượng cao với dịch vụ khách hàng tốt nhất.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">Trang chủ</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">Sản phẩm</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">Giới thiệu</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">Liên hệ</Link>
              </li>
            </ul>
          </div>
          
          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tài khoản</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white">Đăng nhập</Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white">Đăng ký</Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white">Thông tin cá nhân</Link>
              </li>
              <li>
                <Link href="/forgot-password" className="text-gray-300 hover:text-white">Quên mật khẩu</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2" />
                <span className="text-gray-300">123 Đường ABC, Thành phố XYZ, Việt Nam</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span className="text-gray-300">+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span className="text-gray-300">info@kiwey.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© {currentYear} KIWEY. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;