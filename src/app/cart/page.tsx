// "use client";

// import { useState } from "react";
// import Layout from "../components/layout";
// import { Button } from "@/app/components/ui/button";

// // Mock data for cart items
// const initialCartItems = [
//   { id: 1, name: "Laptop", price: 999, quantity: 1 },
//   { id: 2, name: "Smartphone", price: 699, quantity: 2 },
// ];

// export default function Cart() {
//   const [cartItems, setCartItems] = useState(initialCartItems);

//   const removeFromCart = (id: number) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border-b py-2"
//             >
//               <div>
//                 <h3 className="font-semibold">{item.name}</h3>
//                 <p>Quantity: {item.quantity}</p>
//                 <p>${item.price * item.quantity}</p>
//               </div>
//               <Button
//                 variant="destructive"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <div className="mt-4">
//             <p className="text-xl font-bold">Total: ${total}</p>
//             <Button className="mt-2">Proceed to Checkout</Button>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }




'use client'

import { useState } from 'react'
import Image from 'next/image'
import Layout from '../components/layout'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Minus, Plus, X } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

// Mock data for cart items
const initialCartItems: CartItem[] = [
  { id: 1, name: "Black and Gray Athletic Cotton Socks - 6 Pairs", price: 1090, quantity: 1, image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=" },
  { id: 2, name: "Intermediate Size Basketball", price: 2095, quantity: 2, image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=" },
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const formatPrice = (cents: number) => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  return (
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
            {cartItems.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Price: {formatPrice(item.price)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
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
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Shipping:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}

