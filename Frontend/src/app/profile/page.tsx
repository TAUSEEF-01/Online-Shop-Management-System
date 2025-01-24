// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Layout from "../components/layout";
// import { Button } from "@/app/components/ui/button";
// import { api } from "@/utils/api";
// import ProtectedRoute from "../components/protected-route";
// import { Label } from "@/app/components/ui/label";
// import { Checkbox } from "@/app/components/ui/checkbox";

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
//   const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date()]);
//   const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
//   const keywords = ['paid', 'unpaid'];

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await api.getUserInfo();
//         console.log("User Info Response:", response);

//         if (response.success) {
//           setUserInfo(response.user);
//           const billingResponse = await api.getBillingsByUserId(response.user.user_id);
//           console.log("Billing Response:", billingResponse);

//           // Check if the billing response is successful and data is an array
//           if (billingResponse.status === "success" && Array.isArray(billingResponse.data)) {
//             setBillings(billingResponse.data); // Extract the bills array
//           } else {
//             console.error("Unexpected billing response format:", billingResponse);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching user or billing info:", err);
//         setError("Failed to load user information");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, [router]);

//   const handleKeywordChange = (keyword: string, checked: boolean) => {
//     setSelectedKeywords(
//       checked
//         ? [...selectedKeywords, keyword]
//         : selectedKeywords.filter((k) => k !== keyword)
//     );
//   };

//   const handlePayment = async (billId: number) => {
//     try {
//       await api.updatePaymentStatus(billId, "paid");
//       setBillings((prevBillings) =>
//         prevBillings.map((billing) =>
//           billing.bill_id === billId ? { ...billing, pay_status: "paid" } : billing
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update payment status:", error);
//     }
//   };

//   const filteredBillings = billings.filter(
//     (billing) =>
//       new Date(billing.bill_date) >= dateRange[0] &&
//       new Date(billing.bill_date) <= dateRange[1] &&
//       (selectedKeywords.length === 0 ||
//         selectedKeywords.includes(billing.pay_status.toLowerCase()))
//   );

//   if (isLoading) {
//     return (
//       <ProtectedRoute>
//       <Layout>
//         <div className="flex justify-center items-center min-h-screen">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//         </div>
//       </Layout>
//       </ProtectedRoute>
//     );
//   }

//   if (error) {
//     return (
//       <ProtectedRoute>
//       <Layout>
//         <div className="text-center text-red-600 mt-8">{error}</div>
//       </Layout>
//       </ProtectedRoute>
//     );
//   }

//   return (
//     <ProtectedRoute>
//       <Layout>
        

//         {/* User Profile Section */}
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
//                   onClick={() => router.push("/profile/edit-profile")}
//                   className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
//                 >
//                   Edit Profile
//                 </Button>
//                 {/* <Button
//                   variant="destructive"
//                   onClick={() => router.push("/change-password")}
//                 >
//                   Change Password
//                 </Button> */}
//               </div>
//             </div>
//           )}
//         </div>


//         {/* Filter Section */}
//         <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Filter Billings</h2>
//           <div className="space-y-4">
//             <div>
//               <Label>Date Range</Label>
//               <input
//                 type="date"
//                 value={dateRange[0].toISOString().split('T')[0]}
//                 onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
//                 className="mt-2 p-2 border rounded"
//               />
//               <input
//                 type="date"
//                 value={dateRange[1].toISOString().split('T')[0]}
//                 onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
//                 className="mt-2 p-2 border rounded"
//               />
//             </div>
//             <div>
//               <Label>Keywords</Label>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {keywords.map((keyword) => (
//                   <div key={keyword} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={keyword}
//                       checked={selectedKeywords.includes(keyword)}
//                       onCheckedChange={(checked) => handleKeywordChange(keyword, checked === true)}
//                     />
//                     <label htmlFor={keyword}>{keyword}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Billing Section */}
//         <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-4">Billing Information</h2>
//           {filteredBillings.length > 0 ? (
//             <div className="space-y-4">
//               {filteredBillings.map((billing) => (
//                 <div key={billing.bill_id} className="p-4 bg-gray-50 rounded-lg">
//                   <div className="font-semibold">Bill ID: {billing.bill_id}</div>
//                   <div>Bill Date: {billing.bill_date}</div>
//                   <div>Order Total Price: {billing.order_total_price}</div>
//                   <div>Bill Total Price: {billing.bill_total_price}</div>
//                   <div>Payment Status: {billing.pay_status}</div>
//                   <div className="mt-2">
//                     <div className="font-semibold">Products:</div>
//                     <ul className="list-disc list-inside">
//                       {billing.products?.length > 0 ? (
//                         billing.products.map((product) => (
//                           <li key={product.prod_id}>
//                             Product ID: {product.prod_id}, Quantity:{" "}
//                             {product.prod_qty}, Price: {product.prod_price}, Total
//                             Price: {product.prod_total_price}
//                           </li>
//                         ))
//                       ) : (
//                         <li>No products available.</li>
//                       )}
//                     </ul>
//                   </div>
//                   {billing.pay_status.toLowerCase() === "unpaid" && (
//                     <Button
//                       variant="default"
//                       onClick={() => handlePayment(billing.bill_id)}
//                       className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
//                     >
//                       Pay Now
//                     </Button>
//                   )}
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
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Calendar, CreditCard, User, Edit } from 'lucide-react';

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
  order_total_price: number | string;
  bill_total_price: number | string;
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
  const [dateRange, setDateRange] = useState([new Date('2025-01-01'), new Date()]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const keywords = ['paid', 'unpaid'];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo();
        console.log("User Info Response:", response);

        if (response.success) {
          setUserInfo(response.user);
          const billingResponse = await api.getBillingsByUserId(response.user.user_id);
          console.log("Billing Response:", billingResponse);

          if (billingResponse.status === "success" && Array.isArray(billingResponse.data)) {
            setBillings(billingResponse.data);
          } else {
            console.error("Unexpected billing response format:", billingResponse);
          }
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

  const handleKeywordChange = (keyword: string, checked: boolean) => {
    setSelectedKeywords(
      checked
        ? [...selectedKeywords, keyword]
        : selectedKeywords.filter((k) => k !== keyword)
    );
  };

  const handlePayment = async (billId: number) => {
    try {
      await api.updatePaymentStatus(billId, "paid");
      setBillings((prevBillings) =>
        prevBillings.map((billing) =>
          billing.bill_id === billId ? { ...billing, pay_status: "paid" } : billing
        )
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  const safeToFixed = (value: number | string, decimals: number = 2): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? '0.00' : numValue.toFixed(decimals);
  };

  const filteredBillings = billings.filter(
    (billing) =>
      new Date(billing.bill_date) >= dateRange[0] &&
      new Date(billing.bill_date) <= dateRange[1] &&
      (selectedKeywords.length === 0 ||
        selectedKeywords.includes(billing.pay_status.toLowerCase()))
  );

  if (isLoading) {
    return (
      <ProtectedRoute>
      <Layout>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
      </Layout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
      <Layout>
        <div className="text-center text-red-600 mt-8 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      {/* <Layout> */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
          {/* User Profile Section */}
          <div className="max-w-3xl mx-auto mb-8 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
            <div className="flex items-center mb-6">
              <User className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Profile Information</h1>
            </div>
            {userInfo && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 bg-blue-50 p-6 rounded-xl">
                  {[
                    { label: "Name", value: userInfo.user_name },
                    { label: "Email", value: userInfo.user_email },
                    { label: "Contact Number", value: userInfo.user_contact_no },
                    { label: "Account Type", value: userInfo.is_admin ? "Administrator" : "Regular User" }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="font-medium text-gray-600">{label}:</span>
                      <span className="text-gray-800 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/profile/edit-profile")}
                    className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-full px-6 py-2"
                  >
                    <Edit className="w-5 h-5" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Filter Section */}
          <div className="max-w-3xl mx-auto mb-8 p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Filter Billings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700">Date Range</Label>
                <div className="flex gap-4 mt-2">
                  <input
                    type="date"
                    value={dateRange[0].toISOString().split('T')[0]}
                    onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <input
                    type="date"
                    value={dateRange[1].toISOString().split('T')[0]}
                    onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700">Keywords</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {keywords.map((keyword) => (
                    <div key={keyword} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                      <Checkbox
                        id={keyword}
                        checked={selectedKeywords.includes(keyword)}
                        onCheckedChange={(checked) => handleKeywordChange(keyword, checked === true)}
                        className="border-blue-300"
                      />
                      <label htmlFor={keyword} className="text-gray-700">{keyword}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Billing Section */}
          <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-blue-100">
            <div className="flex items-center mb-4">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Billing Information</h2>
            </div>
            {filteredBillings.length > 0 ? (
              <div className="space-y-4">
                {filteredBillings.map((billing) => (
                  <div key={billing.bill_id} className="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all">
                    <div className="grid md:grid-cols-2 gap-2">
                      <div>
                        <div className="font-semibold text-gray-700">Bill ID: <span className="text-blue-600">{billing.bill_id}</span></div>
                        <div className="text-gray-600">Bill Date: {billing.bill_date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-700">Order Total: <span className="text-green-600">${safeToFixed(billing.order_total_price)}</span></div>
                        <div className="text-gray-600">Bill Total: <span className="text-blue-600">${safeToFixed(billing.bill_total_price)}</span></div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between items-center">
                        <div>
                          Payment Status: 
                          <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                            billing.pay_status.toLowerCase() === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {billing.pay_status}
                          </span>
                        </div>
                        {billing.pay_status.toLowerCase() === "unpaid" && (
                          <Button
                            onClick={() => handlePayment(billing.bill_id)}
                            className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-4 py-1"
                          >
                            Pay Now
                          </Button>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="font-semibold text-gray-700">Products:</div>
                        <ul className="space-y-1 pl-4 list-disc">
                          {billing.products?.length > 0 ? (
                            billing.products.map((product) => (
                              <li key={product.prod_id} className="text-gray-600">
                                Product ID: {product.prod_id}, Qty: {product.prod_qty}, 
                                Price: ${safeToFixed(product.prod_price)}, 
                                Total: ${safeToFixed(product.prod_total_price)}
                              </li>
                            ))
                          ) : (
                            <li>No products available.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 bg-blue-50 p-4 rounded-xl">
                No billing information available.
              </div>
            )}
          </div>
        </div>
      {/* </Layout> */}
    </ProtectedRoute>
  );
}