"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/utils/api";

interface CartContextType {
  cartCount: number;
  incrementCart: () => void;
  setCartCount: (count: number) => void;
  refreshCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  incrementCart: () => {},
  setCartCount: () => {},
  refreshCartCount: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      const userId = await api.getCurrentUserId();
      const response = await api.getCartItems(userId);

      if (response.status === "success" && Array.isArray(response.data)) {
        // Calculate total items including quantities
        const totalItems = response.data.reduce(
          (total: number, item: any) => total + (item.quantity || 1),
          0
        );
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
      setCartCount(0);
    }
  };

  const incrementCart = () => {
    setCartCount((prev) => prev + 1);
  };

  // Fetch initial cart count when component mounts
  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, incrementCart, setCartCount, refreshCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
