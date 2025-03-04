"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartCount: number;
  incrementCart: () => void;
  setCartCount: (count: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  incrementCart: () => {},
  setCartCount: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const incrementCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
