"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { api } from "@/utils/api";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin-dashboard" className="flex items-center">
              <span className="text-xl font-bold">Admin Dashboard</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/admin-dashboard" className="nav-link">
              <Button
                variant="ghost"
                className="text-white hover:text-blue-200"
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Dashboard
              </Button>
            </Link>

            <Link href="/update-product-info" className="nav-link">
              <Button
                variant="ghost"
                className="text-white hover:text-blue-200"
              >
                <Package className="h-5 w-5 mr-2" />
                Products
              </Button>
            </Link>

            <Link href="/manage-users" className="nav-link">
              <Button
                variant="ghost"
                className="text-white hover:text-blue-200"
              >
                <Users className="h-5 w-5 mr-2" />
                Users
              </Button>
            </Link>

            <Link href="/admin-settings" className="nav-link">
              <Button
                variant="ghost"
                className="text-white hover:text-blue-200"
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </Link>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:text-blue-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
