"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/protected-route";
import { useCart } from "../context/CartContext";

interface CartItem {
  cart_id: number;
  prod_id: number;
  prod_name: string;
  prod_price: number;
  quantity: number;
  prod_image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { refreshCartCount } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = await api.getCurrentUserId();
        const response = await api.getCartItems(userId);

        if (response.status === "success" && Array.isArray(response.data)) {
          const itemsWithQuantity = response.data.map((item: CartItem) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCartItems(itemsWithQuantity);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setError("Failed to load cart items");
        console.error("Error fetching cart items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.cart_id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      // Refresh cart count after quantity update
      refreshCartCount();
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      await api.removeFromCart(cartId);
      setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
      // Refresh cart count after removing item
      refreshCartCount();
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.prod_price * item.quantity,
      0
    );
  }, [cartItems]);

  // Adding shipping fee
  const shippingFee = 10.0;

  const total = useMemo(() => {
    return subtotal + shippingFee;
  }, [subtotal]);

  const proceedToCheckout = async () => {
    try {
      const userId = await api.getCurrentUserId();
      const username = await api.getCurrentUserName(userId);
      const orderDetails = cartItems.map((item) => ({
        prod_id: item.prod_id,
        prod_qty: item.quantity,
        prod_price: item.prod_price,
        prod_total_price: item.prod_price * item.quantity,
      }));

      console.log("Creating order with details:", orderDetails);

      const orderResponse = await api.createOrder({
        user_id: userId,
        user_address: "123 Main St",
        total_amt: total,
        order_status: "in process",
        order_details: orderDetails,
      });

      if (orderResponse.status === "success") {
        const orderId = orderResponse.data;

        console.log("Order created successfully with ID:", orderId);

        const billResponse = await api.createBill({
          user_id: userId,
          order_id: orderId,
          user_name: username,
          products: orderDetails,
          order_total_price: total,
          bill_total_price: total,
          pay_status: "unpaid",
        });

        if (billResponse.status === "success") {
          console.log("Bill created successfully");

          const clearCartResponse = await api.clearCart(userId);

          if (clearCartResponse.status === "success") {
            setCartItems([]);
            console.log("Cart cleared successfully");
          } else {
            console.error("Failed to clear cart:", clearCartResponse.message);
          }

          router.push(`/billing?orderId=${orderId}`);
        } else {
          console.error("Failed to create bill");
        }
      } else {
        console.error("Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order or bill:", err);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <p>Loading cart items...</p>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <p className="text-red-500">{error}</p>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl font-medium uppercase">YOUR CART</h1>
            <div className="border-b border-gray-200 mt-2"></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                {cartItems.map((item) => (
                  <div
                    key={item.cart_id}
                    className="mb-6 pb-6 border-b border-gray-200"
                  >
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      <div className="w-24 h-24 relative">
                        <Image
                          src={item.prod_image || "/placeholder.svg"}
                          alt={item.prod_name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">
                          {item.prod_name}
                        </h3>
                        <p className="text-lg mt-1">
                          {formatPrice(item.prod_price)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.cart_id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 px-2 py-2 border border-gray-300 text-center"
                        />
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cart_id)}
                        className="p-2"
                      >
                        <Trash2 className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:col-span-4">
                <div className="bg-white p-6">
                  <h2 className="text-lg font-medium mb-4">CART TOTALS</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span>{formatPrice(shippingFee)}</span>
                    </div>

                    <div className="flex justify-between font-bold pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-3 uppercase"
                    onClick={proceedToCheckout}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
