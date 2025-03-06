// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { api } from "@/utils/api";

// export default function AdminNavbar() {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await api.logout();
//       router.push("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <nav className="bg-blue-800 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/admin-dashboard" className="flex items-center">
//               <span className="text-xl font-bold">Admin Dashboard</span>
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Link href="/admin-dashboard" className="nav-link">
//               <Button
//                 variant="ghost"
//                 className="text-white hover:text-blue-200"
//               >
//                 <LayoutDashboard className="h-5 w-5 mr-2" />
//                 Dashboard
//               </Button>
//             </Link>

//             <Link href="/update-product-info" className="nav-link">
//               <Button
//                 variant="ghost"
//                 className="text-white hover:text-blue-200"
//               >
//                 <Package className="h-5 w-5 mr-2" />
//                 Products
//               </Button>
//             </Link>

//             <Link href="/manage-users" className="nav-link">
//               <Button
//                 variant="ghost"
//                 className="text-white hover:text-blue-200"
//               >
//                 <Users className="h-5 w-5 mr-2" />
//                 Users
//               </Button>
//             </Link>

//             <Link href="/admin-settings" className="nav-link">
//               <Button
//                 variant="ghost"
//                 className="text-white hover:text-blue-200"
//               >
//                 <Settings className="h-5 w-5 mr-2" />
//                 Settings
//               </Button>
//             </Link>

//             <Button
//               variant="ghost"
//               onClick={handleLogout}
//               className="text-white hover:text-blue-200"
//             >
//               <LogOut className="h-5 w-5 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }












"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { Badge, ShoppingCart, User } from "lucide-react";
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
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-700">Admin Dashboard</h1>
              <span className="ml-2 px-2 py-1 bg-green-500 text-white text-sm rounded-full">
                Live
              </span>
            </div>
            
          </nav>

          <nav className="flex items-center space-x-6 mr-3">

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
