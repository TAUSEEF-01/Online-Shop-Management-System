// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Layout from "../components/layout";
// import { Button } from "@/app/components/ui/button";
// import { api } from "@/utils/api";
// import ProtectedRoute from '../components/protected-route';

// interface UserInfo {
//   user_id: number;
//   user_name: string;
//   user_email: string;
//   user_contact_no: string;
//   is_admin: boolean;
// }

// interface Billing {
//   bill_id: number;
//   bill_date: string;
//   order_total_price: number;
//   bill_total_price: number;
//   pay_status: string;
//   products: {
//     prod_id: number;
//     prod_qty: number;
//     prod_price: number;
//     prod_total_price: number;
//   }[];
// }

// export default function Profile() {
//   const router = useRouter();
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [billings, setBillings] = useState<Billing[]>([]);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await api.getUserInfo();
//         console.log('Response:', response);
//         if (response.success) {
//           setUserInfo(response.user);
//           const billingResponse = await api.getBillingsByUserId(response.user.user_id);
//           console.log('Billing Response:', billingResponse);
//           setBillings(billingResponse);
//         }
//       } catch (err) {
//         setError("Failed to load user information");
//         // router.push("/");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, [router]);

//   if (isLoading) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center min-h-screen">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="text-center text-red-600 mt-8">{error}</div>
//       </Layout>
//     );
//   }

  

//   return (
//     <ProtectedRoute>
//       <Layout>
//         <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
//           {userInfo && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
//                 <div className="font-semibold">Name:</div>
//                 <div>{userInfo.user_name}</div>
                
//                 <div className="font-semibold">Email:</div>
//                 <div>{userInfo.user_email}</div>
                
//                 <div className="font-semibold">Contact Number:</div>
//                 <div>{userInfo.user_contact_no}</div>
                
//                 <div className="font-semibold">Account Type:</div>
//                 <div>{userInfo.is_admin ? "Administrator" : "Regular User"}</div>
//               </div>

//               <div className="flex justify-end space-x-4 mt-6">
//                 <Button
//                   variant="outline"
//                   onClick={() => router.push("/edit-profile")}
//                 >
//                   Edit Profile
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={() => router.push("/change-password")}
//                 >
//                   Change Password
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Billing Information</h2>
//           {billings.length > 0 ? (
//             <div className="space-y-4">
//               {billings.map((billing) => (
//                 <div key={billing.bill_id} className="p-4 bg-gray-50 rounded-lg">
//                   <div className="font-semibold">Bill ID: {billing.bill_id}</div>
//                   <div>Bill Date: {billing.bill_date}</div>
//                   <div>Order Total Price: {billing.order_total_price}</div>
//                   <div>Bill Total Price: {billing.bill_total_price}</div>
//                   <div>Payment Status: {billing.pay_status}</div>
//                   <div className="mt-2">
//                     <div className="font-semibold">Products:</div>
//                     <ul className="list-disc list-inside">
//                       {billing.products.map((product) => (
//                         <li key={product.prod_id}>
//                           Product ID: {product.prod_id}, Quantity: {product.prod_qty}, Price: {product.prod_price}, Total Price: {product.prod_total_price}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>No billing information available.</div>
//           )}
//         </div>
//       </Layout>
//     </ProtectedRoute>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { Button } from "@/app/components/ui/button";
import { api } from "@/utils/api";
import ProtectedRoute from "../components/protected-route";

interface UserInfo {
  user_id: number;
  user_name: string;
  user_email: string;
  user_contact_no: string;
  is_admin: boolean;
}

interface Billing {
  bill_id: number;
  bill_date: string;
  order_total_price: number;
  bill_total_price: number;
  pay_status: string;
  products: {
    prod_id: number;
    prod_qty: number;
    prod_price: number;
    prod_total_price: number;
  }[];
}

export default function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [billings, setBillings] = useState<Billing[]>([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo();
        console.log("User Info Response:", response);

        if (response.success) {
          setUserInfo(response.user);
          const billingResponse = await api.getBillingsByUserId(response.user.user_id);
          console.log("Billing Response:", billingResponse);

          // if (Array.isArray(billingResponse)) {
          //   setBillings(billingResponse);
          // } else {
          //   console.error("Unexpected billing response format:", billingResponse);
          // }

          // Check if the billing response is successful and data is an array
          if (billingResponse.status === "success" && Array.isArray(billingResponse.data)) {
            setBillings(billingResponse.data); // Extract the bills array
          } else {
            console.error("Unexpected billing response format:", billingResponse);
          }

          // if (billingResponse.success && Array.isArray(billingResponse.data)) {
          //   setBillings(billingResponse.data); // Extract the bills array
          // } else if (Object.keys(billingResponse).length === 0) {
          //   console.warn("Billing data is empty.");
          //   setBillings([]);
          // } else {
          //   console.error("Unexpected billing response format:", billingResponse);
          // }
        }
      } catch (err) {
        console.error("Error fetching user or billing info:", err);
        setError("Failed to load user information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center text-red-600 mt-8">{error}</div>
      </Layout>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        {/* User Profile Section */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
          {userInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Name:</div>
                <div>{userInfo.user_name}</div>

                <div className="font-semibold">Email:</div>
                <div>{userInfo.user_email}</div>

                <div className="font-semibold">Contact Number:</div>
                <div>{userInfo.user_contact_no}</div>

                <div className="font-semibold">Account Type:</div>
                <div>{userInfo.is_admin ? "Administrator" : "Regular User"}</div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => router.push("/edit-profile")}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => router.push("/change-password")}
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Billing Section */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Billing Information</h2>
          {billings.length > 0 ? (
            <div className="space-y-4">
              {billings.map((billing) => (
                <div
                  key={billing.bill_id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="font-semibold">Bill ID: {billing.bill_id}</div>
                  <div>Bill Date: {billing.bill_date}</div>
                  <div>Order Total Price: {billing.order_total_price}</div>
                  <div>Bill Total Price: {billing.bill_total_price}</div>
                  <div>Payment Status: {billing.pay_status}</div>
                  <div className="mt-2">
                    <div className="font-semibold">Products:</div>
                    <ul className="list-disc list-inside">
                      {billing.products?.length > 0 ? (
                        billing.products.map((product) => (
                          <li key={product.prod_id}>
                            Product ID: {product.prod_id}, Quantity:{" "}
                            {product.prod_qty}, Price: {product.prod_price}, Total
                            Price: {product.prod_total_price}
                          </li>
                        ))
                      ) : (
                        <li>No products available.</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No billing information available.</div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
