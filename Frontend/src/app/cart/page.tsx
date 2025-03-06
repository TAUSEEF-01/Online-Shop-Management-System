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
  prod_discount: number; // Add discount field
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [addressInputs, setAddressInputs] = useState({
    street: "",
    city: "",
    // state: "",
    // zipcode: "",
    country: "",
  });
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

  const discountedTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const itemTotal = item.prod_price * item.quantity;
      const discountAmount = (itemTotal * item.prod_discount) / 100;
      return sum + (itemTotal - discountAmount);
    }, 0);
  }, [cartItems]);

  // Adding shipping fee
  const shippingFee = 10.0;

  const totalDiscount = subtotal - discountedTotal;
  const finalTotal = discountedTotal + shippingFee;

  const handleAddressChange = (field: string, value: string) => {
    setAddressInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
    setAddressError("");
  };

  const proceedToCheckout = async () => {
    // Validate all address fields
    if (!Object.values(addressInputs).every((value) => value.trim())) {
      setAddressError("Please fill in all address fields");
      return;
    }

    // Format address as a single string
    const formattedAddress = `${addressInputs.street}, ${addressInputs.city},  ${addressInputs.country}`;

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
        user_address: formattedAddress,
        total_amt: finalTotal,
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
          order_total_price: finalTotal,
          bill_total_price: finalTotal,
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
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-gray-800">
                Shopping Cart
              </h1>
              <div className="h-1 w-20 bg-blue-600 mt-4 rounded-full"></div>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <p className="text-xl text-gray-500">Your cart is empty</p>
                <Button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => router.replace("/Home")}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="md:col-span-8 space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.cart_id}
                      className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="w-28 h-28 relative rounded-lg overflow-hidden">
                          <Image
                            src={item.prod_image || "/placeholder.svg"}
                            alt={item.prod_name}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 hover:scale-110"
                          />
                        </div>

                        <div className="flex-grow space-y-2">
                          <h3 className="font-semibold text-xl text-gray-800">
                            {item.prod_name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-blue-600">
                              {formatPrice(
                                item.prod_price * (1 - item.prod_discount / 100)
                              )}
                            </p>
                            {item.prod_discount > 0 && (
                              <>
                                <p className="text-lg text-gray-400 line-through">
                                  {formatPrice(item.prod_price)}
                                </p>
                                <span className="text-green-600 font-semibold">
                                  {item.prod_discount}% OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.cart_id, item.quantity - 1)
                              }
                              className="px-3 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
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
                              className="w-12 text-center border-x border-gray-200 py-2"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item.cart_id, item.quantity + 1)
                              }
                              className="px-3 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cart_id)}
                            className="p-2 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-4">
                  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4 text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-medium">
                          {formatPrice(subtotal)}
                        </span>
                      </div>

                      {totalDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span className="font-medium">
                            -{formatPrice(totalDiscount)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="font-medium">
                          {formatPrice(shippingFee)}
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-800">
                          <span>Final Total</span>
                          <span>{formatPrice(finalTotal)}</span>
                        </div>
                        {totalDiscount > 0 && (
                          <p className="text-sm text-green-600 mt-2">
                            You saved {formatPrice(totalDiscount)}!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 mt-6 pt-6">
                      <h3 className="font-semibold text-gray-800 mb-4">
                        Delivery Address
                      </h3>
                      <div className="space-y-4">
                        <input
                          className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
                          type="text"
                          placeholder="Street Address"
                          value={addressInputs.street}
                          onChange={(e) =>
                            handleAddressChange("street", e.target.value)
                          }
                        />
                        <div className="flex gap-3">
                          <input
                            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="City"
                            value={addressInputs.city}
                            onChange={(e) =>
                              handleAddressChange("city", e.target.value)
                            }
                          />
                          {/* <input
                            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="State"
                            value={addressInputs.state}
                            onChange={(e) =>
                              handleAddressChange("state", e.target.value)
                            }
                          /> */}
                        </div>
                        <div className="flex gap-3">
                          {/* <input
                            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="Zipcode"
                            value={addressInputs.zipcode}
                            onChange={(e) =>
                              handleAddressChange("zipcode", e.target.value)
                            }
                          /> */}
                          <input
                            className="border border-gray-300 rounded-2xl py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="Country"
                            value={addressInputs.country}
                            onChange={(e) =>
                              handleAddressChange("country", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      {addressError && (
                        <p className="text-red-500 text-sm mt-2">
                          {addressError}
                        </p>
                      )}
                    </div>

                    <Button
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02]"
                      onClick={proceedToCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
