"use client";
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho category card
type CategoryCardProps = {
  id: string;
  title: string;
  discount: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
};

// Component CategoryCard với thiết kế và hiệu ứng mới
const CategoryCard: FC<CategoryCardProps> = ({ 
  title, 
  discount, 
  imageUrl, 
  buttonText, 
  buttonLink 
}) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg group relative h-52 md:h-64 transition-all duration-300 hover:shadow-2xl">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/50 z-10"></div>
      
      {/* Hiệu ứng shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full duration-1000 z-20"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-80"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center p-6 text-white">
        <h3 className="text-2xl font-bold mb-1">{title}</h3>
        <p className="text-blue-300 font-medium mb-4">{discount}</p>
        
        <Link 
          href={buttonLink}
          className="inline-block w-fit px-5 py-2 bg-white text-black rounded-md font-medium 
            transition-all transform group-hover:bg-blue-500 group-hover:text-white"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

// Props cho CategorySection
type CategorySectionProps = {
  categories: CategoryCardProps[];
};

// Component CategorySection
const CategorySection: FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id}
            {...category}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;