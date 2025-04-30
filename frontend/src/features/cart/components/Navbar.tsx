"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../hooks/useCart';
import { ShoppingIconEmpty, ShoppingIconFill } from '@/shared/components/icons/svgIcons';

const Navbar = () => {
  const { items = [], isVisible, onToggle } = useCart();
  const totalCount = items?.reduce((sum: number, item: import('../types/cart').TCartItem) => sum + item.quantity, 0) || 0;

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <Link href="/">Home</Link>
      <button onClick={() => onToggle(!isVisible)} className="relative">
        {totalCount > 0 ? <ShoppingIconFill width={24} /> : <ShoppingIconEmpty width={24} />}
        {totalCount > 0 && (
          <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">
            {totalCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Navbar;