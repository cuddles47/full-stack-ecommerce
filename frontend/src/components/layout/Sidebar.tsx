"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  FaLaptop, 
  FaTabletAlt, 
  FaMobileAlt, 
  FaCamera, 
  FaTv, 
  FaGamepad, 
  FaClock, 
  FaMicrochip, 
  FaPrint, 
  FaHeadphones,
  FaAngleRight 
} from 'react-icons/fa';

const categories = [
  { 
    id: 'computers', 
    name: 'Computers & Laptops', 
    icon: <FaLaptop />, 
    hasChildren: true,
    href: '/category/computers'
  },
  { 
    id: 'tablets', 
    name: 'Tablets', 
    icon: <FaTabletAlt />, 
    hasChildren: false,
    href: '/category/tablets'
  },
  { 
    id: 'smartphones', 
    name: 'Smartphones', 
    icon: <FaMobileAlt />, 
    hasChildren: true,
    href: '/category/smartphones'
  },
  { 
    id: 'camera', 
    name: 'Camera & Photography', 
    icon: <FaCamera />, 
    hasChildren: true,
    href: '/category/camera'
  },
  { 
    id: 'tv', 
    name: 'TV & Home Theatre', 
    icon: <FaTv />, 
    hasChildren: true,
    href: '/category/tv'
  },
  { 
    id: 'games', 
    name: 'Video Games', 
    icon: <FaGamepad />, 
    hasChildren: true,
    href: '/category/games'
  },
  { 
    id: 'smartwatches', 
    name: 'Smart Watches', 
    icon: <FaClock />, 
    hasChildren: false,
    href: '/category/smartwatches'
  },
  { 
    id: 'components', 
    name: 'Computer Components', 
    icon: <FaMicrochip />, 
    hasChildren: true,
    href: '/category/components'
  },
  { 
    id: 'printers', 
    name: 'Printers & Ink', 
    icon: <FaPrint />, 
    hasChildren: false,
    href: '/category/printers'
  },
  { 
    id: 'audio', 
    name: 'Audios & Headphones', 
    icon: <FaHeadphones />, 
    hasChildren: true,
    href: '/category/audio'
  }
];

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  return (
    <aside className="bg-white rounded-lg shadow-sm">
      <nav className="py-2">
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="border-b border-gray-100 last:border-b-0">
              <div className="flex justify-between items-center">
                <Link
                  href={category.href}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-500 w-full"
                >
                  <span className="mr-3 text-gray-500">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </Link>
                
                {category.hasChildren && (
                  <button 
                    onClick={() => toggleCategory(category.id)}
                    className="px-2 py-3 text-gray-500 hover:text-blue-500"
                  >
                    <FaAngleRight 
                      className={`transition-transform duration-200 ${
                        activeCategory === category.id ? 'transform rotate-90' : ''
                      }`} 
                    />
                  </button>
                )}
              </div>

              {/* Dropdown submenu - we'd populate this with real subcategories */}
              {category.hasChildren && activeCategory === category.id && (
                <div className="pl-10 pb-2 bg-gray-50">
                  <ul>
                    {/* Here we could map over subcategories */}
                    <li>
                      <Link href={`${category.href}/sub-1`} className="block py-2 text-sm text-gray-600 hover:text-blue-500">
                        Sub Category 1
                      </Link>
                    </li>
                    <li>
                      <Link href={`${category.href}/sub-2`} className="block py-2 text-sm text-gray-600 hover:text-blue-500">
                        Sub Category 2
                      </Link>
                    </li>
                    <li>
                      <Link href={`${category.href}/sub-3`} className="block py-2 text-sm text-gray-600 hover:text-blue-500">
                        Sub Category 3
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;