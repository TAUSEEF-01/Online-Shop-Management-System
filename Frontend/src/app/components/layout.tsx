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

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin when component mounts
    const user = localStorage.getItem("user");
    console.log("User:", user);
    if (user) {
      const userData = JSON.parse(user);
      setIsAdmin(userData.is_admin);
    }
  }, []);

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
  

//   const handleLogout = async () => {
//     try {
//         const response = await fetch("/api/auth/logout", {
//             method: "POST",
//             credentials: "include",
//             headers: { "Content-Type": "application/json" }
//         });

//         console.log("Logout response status:", response.status);
//         const data = await response.json();
//         console.log("Logout response data:", data);

//         if (!response.ok) throw new Error("Logout failed");

//         // Clear local data
//         localStorage.removeItem("user");

//         // Check cookies after server response
//         console.log("Cookies after logout:", document.cookie);

//         // Force a full page reload to clear session cookies
//         window.location.href = "/login";
//     } catch (error) {
//         console.error("Logout error:", error);
//     }
// };


  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-2">
        <div className="container mx-auto flex items-center justify-between">
          {/* <div className="text-3xl font-bold tracking-wide hover:text-blue-200 transition-all"> */}



          {/* <div className="text-3xl font-bold tracking-wide">
            <Link href="/" className="flex items-center">
              <span className="text-gray-800">My shop</span>
              <span className="text-blue-500 ml-1">.</span>
            </Link>
          </div> */}


          {/* <div className='flex items-center justify-between py-5 font-medium'> */}
            <Link href='/'>
            {/* <Image src={logo} alt="Logo" className='w-15 h-15' /> */}
            <Image src={logo} alt="Logo" className="w-16 h-16" />
            </Link>
          {/* </div> */}

          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 mx-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 uppercase font-medium text-sm tracking-wider"
            >
              Home
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 uppercase font-medium text-sm tracking-wider border-b-2 border-gray-700"
            >
              Collection
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 uppercase font-medium text-sm tracking-wider"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 uppercase font-medium text-sm tracking-wider"
            >
              Contact
            </Link>
          </nav>

          <nav className="flex items-center space-x-6">
            {/* {isAdmin && (
              <Link
                href="/admin"
                // className="hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2"
              >
                <button 
                // className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Admin Dashboard
                </button>
              </Link>
            )} */}

            <Link href="/cart">
              <ShoppingCart className="h-6 w-6 text-white hover:text-blue-200 transition-all" />
            </Link>

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
                  <Link
                    href="/admin"
                    // className="hover:bg-blue-800 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <button
                      // className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
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
      <main className="flex-1 container mx-auto py-8">{children}</main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          © 2025 My Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
