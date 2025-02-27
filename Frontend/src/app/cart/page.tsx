// 'use client'

// import { useEffect, useMemo, useState } from 'react'
// import Image from 'next/image'
// import Layout from '../components/layout'
// import { Button } from "../components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
// import { Minus, Plus, X } from 'lucide-react'
// import { api } from '@/utils/api'
// import { useRouter } from 'next/navigation';
// import ProtectedRoute from '../components/protected-route'

// interface CartItem {
//   cart_id: number;  
//   prod_id: number;
//   prod_name: string;
//   prod_price: number;
//   quantity: number; // Product quantity
//   prod_image: string;
// }

// export default function Cart() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const userId = await api.getCurrentUserId();
//         const response = await api.getCartItems(userId);

//         if (response.status === "success" && Array.isArray(response.data)) {
//           // Ensure quantity is initialized to 1 if not provided
//           const itemsWithQuantity = response.data.map((item: CartItem) => ({
//             ...item,
//             quantity: item.quantity || 1, // Default quantity to 1
//           }));
//           setCartItems(itemsWithQuantity);
//         } else {
//           setCartItems([]);
//         }
//       } catch (err) {
//         setError("Failed to load cart items");
//         console.error("Error fetching cart items:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const updateQuantity = (id: number, newQuantity: number) => {
//     if (newQuantity > 0) {
//       setCartItems((prevCartItems) =>
//         prevCartItems.map((item) =>
//           item.cart_id === id ? { ...item, quantity: newQuantity } : item
//         )
//       );
//     }
//   };

//   const removeFromCart = async (cartId: number) => {
//     try {
//       await api.removeFromCart(cartId);
//       setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
//     } catch (err) {
//       console.error("Error removing item from cart:", err);
//     }
//   };

//   const formatPrice = (price: number) => {
//     return price.toLocaleString("en-US", {
//       style: "currency",
//       currency: "USD",
//     });
//   };

//   const total = useMemo(() => {
//     return cartItems.reduce(
//       (sum, item) => sum + item.prod_price * item.quantity,
//       0
//     );
//   }, [cartItems]);

//   const proceedToCheckout = async () => {
//     try {
//       const userId = await api.getCurrentUserId();
//       const username = await api.getCurrentUserName(userId);
//       // console.log("Username:", username);
//       const orderDetails = cartItems.map(item => ({
//         prod_id: item.prod_id,
//         prod_qty: item.quantity,
//         prod_price: item.prod_price,
//         prod_total_price: item.prod_price * item.quantity
//       }));

//       console.log("Creating order with details:", orderDetails);

//       const orderResponse = await api.createOrder({
//         user_id: userId,
//         user_address: "123 Main St", // Replace with actual user address
//         total_amt: total,
//         order_status: "in process",
//         order_details: orderDetails
//       });

//       if (orderResponse.status === "success") {
//         const orderId = orderResponse.data;

//         console.log("Order created successfully with ID:", orderId);

//         const billResponse = await api.createBill({
//           user_id: userId,
//           order_id: orderId,
//           user_name: username, // Replace with actual user name
//           products: orderDetails,
//           order_total_price: total,
//           bill_total_price: total,
//           pay_status: "unpaid"
//         });

//         if (billResponse.status === "success") {
//           console.log("Bill created successfully");

//           // // // // Clear the cart after successful order and bill creation
//           // await api.clearCart(userId);
//           // setCartItems([]);

//           // Clear the user's cart after successful bill creation
//         const clearCartResponse = await api.clearCart(userId);

//         if (clearCartResponse.status === "success") {
//           setCartItems([]);
//           console.log("Cart cleared successfully");
//         } else {
//           console.error("Failed to clear cart:", clearCartResponse.message);
//         }

//           router.push(`/billing?orderId=${orderId}`);
//         } else {
//           console.error("Failed to create bill");
//         }
//       } else {
//         console.error("Failed to create order");
//       }
//     } catch (err) {
//       console.error("Error creating order or bill:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <ProtectedRoute>
//         <Layout>
//           <div className="container mx-auto px-4">
//             <p>Loading cart items...</p>
//           </div>
//         </Layout>
//       </ProtectedRoute>
//     );
//   }

//   if (error) {
//     return (
//       <ProtectedRoute>
//       <Layout>
//         <div className="container mx-auto px-4">
//           <p className="text-red-500">{error}</p>
//         </div>
//       </Layout>
//       </ProtectedRoute>
//     );
//   }

//   return (
//     <ProtectedRoute>
//     <Layout>
//       <div className="container mx-auto px-4">
//         <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//         {cartItems.length === 0 ? (
//           <Card>
//             <CardContent className="pt-6">
//               <p className="text-center text-gray-500">Your cart is empty.</p>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <Card key={item.cart_id}>
//                 <CardContent className="p-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="relative h-24 w-24 flex-shrink-0">
//                       <Image
//                         src={item.prod_image || "/placeholder.svg"}
//                         alt={item.prod_name}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-md"
//                       />
//                     </div>
//                     <div className="flex-grow">
//                       <h3 className="font-semibold">{item.prod_name}</h3>
//                       <p className="text-sm text-gray-500">
//                         Price: {formatPrice(item.prod_price)}
//                       </p>

//                       <div className="flex items-center space-x-2 mt-2">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={() =>
//                             updateQuantity(item.cart_id, item.quantity - 1)
//                           }
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span>{item.quantity}</span>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           onClick={() =>
//                             updateQuantity(item.cart_id, item.quantity + 1)
//                           }
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                     <div className="flex flex-col items-end space-y-2">
//                       <p className="font-semibold">
//                         {formatPrice(item.prod_price * item.quantity)}
//                       </p>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => removeFromCart(item.cart_id)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-between items-center mt-2 text-lg font-bold">
//                   <span>Total:</span>
//                   <span>{formatPrice(total)}</span>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full" onClick={proceedToCheckout}>
//                   Proceed to Checkout
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         )}
//       </div>
//     </Layout>
//     </ProtectedRoute>
//   );
// }





'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Layout from '../components/layout'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/protected-route'

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

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.prod_price * item.quantity,
      0
    );
  }, [cartItems]);
  
  // Adding shipping fee
  const shippingFee = 10.00;
  
  const total = useMemo(() => {
    return subtotal + shippingFee;
  }, [subtotal]);

  const proceedToCheckout = async () => {
    try {
      const userId = await api.getCurrentUserId();
      const username = await api.getCurrentUserName(userId);
      const orderDetails = cartItems.map(item => ({
        prod_id: item.prod_id,
        prod_qty: item.quantity,
        prod_price: item.prod_price,
        prod_total_price: item.prod_price * item.quantity
      }));

      console.log("Creating order with details:", orderDetails);

      const orderResponse = await api.createOrder({
        user_id: userId,
        user_address: "123 Main St",
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
          user_name: username,
          products: orderDetails,
          order_total_price: total,
          bill_total_price: total,
          pay_status: "unpaid"
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
                  <div key={item.cart_id} className="mb-6 pb-6 border-b border-gray-200">
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
                        <h3 className="font-medium text-lg">{item.prod_name}</h3>
                        <p className="text-lg mt-1">{formatPrice(item.prod_price)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.cart_id, parseInt(e.target.value))}
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