'use client';

import React from 'react';

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Sản phẩm 1',
      description: 'Mô tả chi tiết sản phẩm 1',
      price: '1,000,000 VND',
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 2,
      name: 'Sản phẩm 2',
      description: 'Mô tả chi tiết sản phẩm 2',
      price: '1,500,000 VND',
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 3,
      name: 'Sản phẩm 3',
      description: 'Mô tả chi tiết sản phẩm 3',
      price: '2,000,000 VND',
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 4,
      name: 'Sản phẩm 4',
      description: 'Mô tả chi tiết sản phẩm 4',
      price: '2,500,000 VND',
      image: 'https://via.placeholder.com/300'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">{product.price}</span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}