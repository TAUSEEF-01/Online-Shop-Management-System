"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { ShoppingCart, User } from "lucide-react";
import "./layoutStyles.css";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "./logo.png";
import { useCart } from "../context/CartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { cartCount, refreshCartCount } = useCart();

  useEffect(() => {
    // Check if user is admin when component mounts
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsAdmin(userData.is_admin);
      // Refresh cart count when component mounts
      refreshCartCount();
    }
  }, [refreshCartCount]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Logout response:", response);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }

      // Clear local storage
      localStorage.removeItem("user");

      console.log("Cookies after logout:", document.cookie);

      // Reset states
      setIsAdmin(false);
      setIsMenuOpen(false);

      // Redirect to login
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src={logo} alt="Logo" className="w-16 h-16" />
          </Link>

            <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 mx-8">
            <Link
              href="/"
              className={`text-white hover:text-blue-200 uppercase font-medium text-sm tracking-wider border-b-2 ${
              window.location.pathname === "/" ? "border-white" : "border-transparent"
              }`}
            >
              Home
            </Link>
            <Link
              href="/Home"
              className={`text-white hover:text-blue-200 uppercase font-medium text-sm tracking-wider border-b-2 ${
              window.location.pathname === "/Home" ? "border-white" : "border-transparent"
              }`}
            >
              Collection
            </Link>
            <Link
              href="/about"
              className={`text-white hover:text-blue-200 uppercase font-medium text-sm tracking-wider border-b-2 ${
              window.location.pathname === "/about" ? "border-white" : "border-transparent"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-white hover:text-blue-200 uppercase font-medium text-sm tracking-wider border-b-2 ${
              window.location.pathname === "/contact" ? "border-white" : "border-transparent"
              }`}
            >
              Contact
            </Link>
            </nav>

          <nav className="flex items-center space-x-6">
            <div className="relative inline-block">
              <Link href="/cart" className="relative inline-flex items-center">
                <ShoppingCart className="h-6 w-6 text-white hover:text-blue-200 transition-all" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="relative">
              <User
                className="h-6 w-6 text-white hover:text-blue-200 transition-all cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                {isAdmin && (
                  <Link href="/admin">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </button>
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto">{children}</main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          © 2025 My Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
