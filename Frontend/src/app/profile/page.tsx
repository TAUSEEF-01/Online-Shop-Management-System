"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { Button } from "@/app/components/ui/button";
import { api } from "@/utils/api";
import ProtectedRoute from "../components/protected-route";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Calendar,
  CreditCard,
  User,
  Edit,
  Mail,
  Phone,
  Shield,
  Clock,
  CheckCircle,
  Filter,
} from "lucide-react";

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
  const [dateRange, setDateRange] = useState([
    new Date("2025-01-01"),
    new Date(),
  ]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const keywords = ["paid", "unpaid"];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.getUserInfo();
        console.log("User Info Response:", response);

        if (response.success) {
          setUserInfo(response.user);
          const billingResponse = await api.getBillingsByUserId(
            response.user.user_id
          );
          console.log("Billing Response:", billingResponse);

          if (
            billingResponse.status === "success" &&
            Array.isArray(billingResponse.data)
          ) {
            setBillings(billingResponse.data);
          } else {
            console.error(
              "Unexpected billing response format:",
              billingResponse
            );
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
          billing.bill_id === billId
            ? { ...billing, pay_status: "paid" }
            : billing
        )
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  const safeToFixed = (
    value: number | string,
    decimals: number = 2
  ): string => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(numValue) ? "0.00" : numValue.toFixed(decimals);
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
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 px-4">
          {/* User Profile Card */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-500 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Profile Information</h1>
                    <p className="text-blue-100">Manage your account details</p>
                  </div>
                </div>
              </div>

              {userInfo && (
                <div className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                      <User className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-semibold text-gray-800">
                          {userInfo.user_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold text-gray-800">
                          {userInfo.user_email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                      <Phone className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-semibold text-gray-800">
                          {userInfo.user_contact_no}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                      <Shield className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Account Type</p>
                        <p className="font-semibold text-gray-800">
                          {userInfo.is_admin ? "Administrator" : "Regular User"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => router.push("/profile/edit-profile")}
                      className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filters Card */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Filter Orders
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Date Range
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={dateRange[0].toISOString().split("T")[0]}
                      onChange={(e) =>
                        setDateRange([new Date(e.target.value), dateRange[1]])
                      }
                      className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <input
                      type="date"
                      value={dateRange[1].toISOString().split("T")[0]}
                      onChange={(e) =>
                        setDateRange([dateRange[0], new Date(e.target.value)])
                      }
                      className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Payment Status
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {keywords.map((keyword) => (
                      <div
                        key={keyword}
                        onClick={() =>
                          handleKeywordChange(
                            keyword,
                            !selectedKeywords.includes(keyword)
                          )
                        }
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all
                          ${
                            selectedKeywords.includes(keyword)
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          } border
                        `}
                      >
                        {keyword === "paid" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                        <span className="capitalize">{keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Billing History
                </h2>
              </div>

              {filteredBillings.length > 0 ? (
                <div className="space-y-4">
                  {filteredBillings.map((billing) => (
                    <div
                      key={billing.bill_id}
                      className="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-all"
                    >
                      <div className="grid md:grid-cols-2 gap-2">
                        <div>
                          <div className="font-semibold text-gray-700">
                            Bill ID:{" "}
                            <span className="text-blue-600">
                              {billing.bill_id}
                            </span>
                          </div>
                          <div className="text-gray-600">
                            Bill Date: {billing.bill_date}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-700">
                            Order Total:{" "}
                            <span className="text-green-600">
                              ${safeToFixed(billing.order_total_price)}
                            </span>
                          </div>
                          <div className="text-gray-600">
                            Bill Total:{" "}
                            <span className="text-blue-600">
                              ${safeToFixed(billing.bill_total_price)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <div>
                            Payment Status:
                            <span
                              className={`ml-2 px-2 py-1 rounded-full text-sm ${
                                billing.pay_status.toLowerCase() === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
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
                          <div className="font-semibold text-gray-700">
                            Products:
                          </div>
                          <ul className="space-y-1 pl-4 list-disc">
                            {billing.products?.length > 0 ? (
                              billing.products.map((product) => (
                                <li
                                  key={product.prod_id}
                                  className="text-gray-600"
                                >
                                  Product ID: {product.prod_id}, Qty:{" "}
                                  {product.prod_qty}, Price: $
                                  {safeToFixed(product.prod_price)}, Total: $
                                  {safeToFixed(product.prod_total_price)}
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
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
