"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  return (
    <aside className="w-60 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4 flex-grow">
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/brands">Brands</Link>
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/trafficView">Traffic</Link>
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-auto text-red-400 hover:text-red-600"
      >
        Sign Out
      </button>
    </aside>
    );
}
