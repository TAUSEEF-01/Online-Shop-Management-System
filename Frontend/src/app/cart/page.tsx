'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Layout from '../components/layout'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Minus, Plus, X } from 'lucide-react'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/protected-route'

interface CartItem {
  cart_id: number;  
  prod_id: number;
  prod_name: string;
  prod_price: number;
  quantity: number; // Product quantity
  prod_image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = await api.getCurrentUserId();
        const response = await api.getCartItems(userId);

        if (response.status === "success" && Array.isArray(response.data)) {
          // Ensure quantity is initialized to 1 if not provided
          const itemsWithQuantity = response.data.map((item: CartItem) => ({
            ...item,
            quantity: item.quantity || 1, // Default quantity to 1
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
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      await api.removeFromCart(cartId);
      setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
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

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.prod_price * item.quantity,
      0
    );
  }, [cartItems]);

  const proceedToCheckout = async () => {
    try {
      const userId = await api.getCurrentUserId();
      const orderDetails = cartItems.map(item => ({
        prod_id: item.prod_id,
        prod_qty: item.quantity,
        prod_price: item.prod_price,
        prod_total_price: item.prod_price * item.quantity
      }));

      console.log("Creating order with details:", orderDetails);

      const orderResponse = await api.createOrder({
        user_id: userId,
        user_address: "123 Main St", // Replace with actual user address
        total_amt: total,
        order_status: "in process",
        order_details: orderDetails
      });

      if (orderResponse.status === "success") {
        const orderId = orderResponse.data;

        console.log("Order created successfully with ID:", orderId);

        const billResponse = await api.createBill({
          user_id: userId,
          order_id: orderId,
          user_name: "John Doe", // Replace with actual user name
          products: orderDetails,
          order_total_price: total,
          bill_total_price: total,
          pay_status: "unpaid"
        });

        if (billResponse.status === "success") {
          console.log("Bill created successfully");
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
          <div className="container mx-auto px-4">
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
        <div className="container mx-auto px-4">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Your cart is empty.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.cart_id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.prod_image || "/placeholder.svg"}
                        alt={item.prod_name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.prod_name}</h3>
                      <p className="text-sm text-gray-500">
                        Price: {formatPrice(item.prod_price)}
                      </p>

                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.cart_id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.cart_id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="font-semibold">
                        {formatPrice(item.prod_price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.cart_id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mt-2 text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={proceedToCheckout}>

                {/* <Button className="w-full" onClick={() => {
                    console.log("Bill created successfully");
                    router.push("/billing");
                  }}> */}
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </Layout>
    </ProtectedRoute>
  );
}
