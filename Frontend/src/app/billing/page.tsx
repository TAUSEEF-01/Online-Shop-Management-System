// 'use client'

// import { useEffect, useState } from 'react';
// import Layout from '../components/layout';
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { api } from '@/utils/api';
// import { useSearchParams } from 'next/navigation';
// import ProtectedRoute from '../components/protected-route';

// interface BillDetail {
//   bill_id: number;
//   bill_date: string;
//   user_id: number;
//   order_id: number;
//   user_name: string;
//   prod_id: number;
//   prod_qty: number;
//   prod_price: number;
//   prod_total_price: number;
//   order_total_price: number;
//   bill_total_price: number;
//   pay_status: string;
// }

// export default function Billing() {
//   const [billDetails, setBillDetails] = useState<BillDetail[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('orderId');

//   useEffect(() => {
//     // const fetchBillDetails = async () => {
//     //   try {
//     //     if (orderId) {
//     //       const response = await api.getBillDetailsByOrderId(Number(orderId));
//     //       console.log("Bill details response:", response.data);

//     //       if (response.status === "success" && response.data) {
//     //         setBillDetails(response.data);
//     //       } else {
//     //         setError("Failed to load bill details");
//     //       }
//     //     } else {
//     //       setError("No order ID provided");
//     //     }
//     //   } catch (err) {
//     //     setError("Failed to load bill details");
//     //     console.error("Error fetching bill details:", err);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     const fetchBillDetails = async () => {
//       try {
//         if (orderId) {
//           const response = await api.getBillDetailsByOrderId(Number(orderId));
//           console.log("Order ID:", Number(orderId));

//           console.log("Bill details response:", response.data);
//           if (response.status === "success") {
//             setBillDetails(response.data);
//           } else {
//             setError("Failed to load bill details");
//           }
//         }
//       } catch (err) {
//         setError("Failed to load bill details");
//         console.error("Error fetching bill details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchBillDetails();
//   }, [orderId]);

//   if (loading) {
//     return <p>Loading bill details...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   console.log("Final bill details (debug):", billDetails);

//   return (
//     <ProtectedRoute>
//       <Layout>
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6 text-center">Billing Confirmation</h1>
//           {/* {billDetails && billDetails.length > 0 ? (
//             <Card className="shadow-lg rounded-lg">
//               <CardHeader className="bg-blue-500 text-white">
//                 <CardTitle className="text-xl">Bill Details</CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <p><strong>Bill Date:</strong> {billDetails[0]?.bill_date}</p>
//                   <p><strong>User Name:</strong> {billDetails[0]?.user_name}</p>
//                   <p><strong>Product ID:</strong> {billDetails[0]?.prod_id}</p>
//                   <p><strong>Product Quantity:</strong> {billDetails[0]?.prod_qty}</p>
//                   <p><strong>Product Price:</strong> {billDetails[0]?.prod_price}</p>
//                   <p><strong>Product Total Price:</strong> {billDetails[0]?.prod_total_price}</p>
//                   <p><strong>Order Total Price:</strong> {billDetails[0]?.order_total_price}</p>
//                   <p><strong>Bill Total Price:</strong> {billDetails[0]?.bill_total_price}</p>
//                   <p><strong>Payment Status:</strong> {billDetails[0]?.pay_status}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : (
//             <p className="text-center text-gray-500">No bill details available.</p>
//           )} */}

//         {/* {billDetails ? ( */}
//         {billDetails && billDetails.length > 0 ? (

//           <Card>
//             <CardHeader>
//               <CardTitle>Bill Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Bill ID: {billDetails[0].bill_id}</p>
//               <p>Bill Date: {billDetails[0].bill_date}</p>
//               <p>User Name: {billDetails[0].user_name}</p>
//               <p>Order Total Price: {billDetails[0].order_total_price}</p>
//               <p>Bill Total Price: {billDetails[0].bill_total_price}</p>
//               <p>Payment Status: {billDetails[0].pay_status}</p>
//               <h2>Products</h2>
//               {billDetails.map((product, index) => (
//                 <div key={index}>
//                   <p>Product ID: {product.prod_id}</p>
//                   <p>Quantity: {product.prod_qty}</p>
//                   <p>Price: {product.prod_price}</p>
//                   <p>Total Price: {product.prod_total_price}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         ) : (
//           <p>No bill details available.</p>
//         )}

//         </div>
//       </Layout>
//     </ProtectedRoute>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { api } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import ProtectedRoute from '../components/protected-route';
import { useRouter } from 'next/navigation';


// Update the interface to represent the structure correctly
interface ProductDetail {
  prod_id: number;
  prod_qty: number;
  prod_price: number;
  prod_total_price: number;
}

interface BillDetail {
  bill_id: number;
  bill_date: string;
  user_id: number;
  order_id: number;
  user_name: string;
  order_total_price: number;
  bill_total_price: number;
  pay_status: string;
  products: ProductDetail[]; // Array of product details
}

export default function Billing() {
  const router = useRouter();
  
  const [billDetails, setBillDetails] = useState<BillDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        if (orderId) {
          const response = await api.getBillDetailsByOrderId(Number(orderId));
          console.log("Order ID:", Number(orderId));
          console.log("Bill details response:", response.data);

          if (response.status === "success") {
            setBillDetails(response.data);
          } else {
            setError("Failed to load bill details");
          }
        } else {
          setError("No order ID provided");
        }
      } catch (err) {
        setError("Failed to load bill details");
        console.error("Error fetching bill details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [orderId]);

  if (loading) {
    return <p>Loading bill details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  console.log("Final bill details (debug):", billDetails);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Billing Confirmation</h1>
          {billDetails ? (
            <Card className="shadow-lg rounded-lg">
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="text-xl">Bill Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <p><strong>Bill ID:</strong> {billDetails.bill_id}</p>
                  <p><strong>Bill Date:</strong> {billDetails.bill_date}</p>
                  <p><strong>User Name:</strong> {billDetails.user_name}</p>
                  <p><strong>Order Total Price:</strong> {billDetails.order_total_price}</p>
                  <p><strong>Bill Total Price:</strong> {billDetails.bill_total_price}</p>
                  <p><strong>Payment Status:</strong> {billDetails.pay_status}</p>
                </div>
                <h2 className="text-lg font-bold mb-4">Products</h2>
                {billDetails.products.length > 0 ? (
                  billDetails.products.map((product, index) => (
                    <div key={index} className="mb-4 border-b pb-4">
                      <p><strong>Product ID:</strong> {product.prod_id}</p>
                      <p><strong>Quantity:</strong> {product.prod_qty}</p>
                      <p><strong>Price:</strong> {product.prod_price}</p>
                      <p><strong>Total Price:</strong> {product.prod_total_price}</p>
                    </div>
                    
                  ))
                  
                ) : (
                  <p className="text-gray-500">No products available for this bill.</p>
                )}
              </CardContent>
              
              <div className="mt-6 flex justify-center">
              <Button 
                className="w-40 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={async () => {
                  try {
                    if (billDetails) {
                    const newStatus = billDetails.pay_status === 'paid' ? 'unpaid' : 'paid';
                    await api.updatePaymentStatus(billDetails.bill_id, newStatus);
                    setBillDetails({
                      ...billDetails,
                      pay_status: newStatus
                    });
                    }
                  } catch (error) {
                    console.error('Failed to update payment status:', error);
                  }
                }}
              >
                {billDetails?.pay_status === 'paid' ? 'Mark as Unpaid' : 'Pay Now'}
              </Button>

              
              </div>

              <div className="mt-6 flex justify-center">
                <Button 
                  className="w-40 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 mb-4"
                  onClick={() => router.replace('/')}
                >
                  Return to Home
                </Button>
              </div>
            </Card>
          ) : (
            <p className="text-center text-gray-500">No bill details available.</p>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
