'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaUserCircle, FaSignOutAlt, FaUserCog, FaCog } from 'react-icons/fa';

interface User {
  id: string;
  username: string;
  email: string;
  detail_user: {
    name: string;
    avatar?: string;
  };
}

export const AuthHeader: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for authentication status when component mounts
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        setIsAuthenticated(true);
        try {
          // In a real app, you'd verify the token with the server
          // For now, just use the stored user info
          const userData = JSON.parse(userStr);
          
          // Fetch full user details - in real app this would be an API call
          // For demo purposes, using mock data
          setUser({
            id: userData.id || '1',
            username: userData.username || 'user',
            email: userData.email || 'user@example.com',
            detail_user: {
              name: userData.name || 'User',
              avatar: "https://randomuser.me/api/portraits/men/1.jpg"
            }
          });
        } catch (err) {
          console.error('Error parsing user data', err);
          handleLogout();
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    // Add click event listener to close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear auth state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    
    // Redirect to login page
    router.push('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center">
      {isAuthenticated && user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 mr-2">
                {user.detail_user.avatar ? (
                  <img
                    src={user.detail_user.avatar}
                    alt={user.detail_user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="h-full w-full text-gray-400" />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user.detail_user.name}
              </span>
              <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
              <Link 
                href="/profile" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaUser className="mr-3 h-4 w-4 text-gray-500" />
                Thông tin cá nhân
              </Link>
              <Link 
                href="/settings" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaCog className="mr-3 h-4 w-4 text-gray-500" />
                Cài đặt
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-3 h-4 w-4 text-gray-500" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 mr-4"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthHeader;