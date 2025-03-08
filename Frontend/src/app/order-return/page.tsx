"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/utils/api";

interface OrderProduct {
  prod_id: number;
  prod_qty: number;
  prod_price: number;
  prod_total_price: number;
}

interface OrderDetails {
  order_id: number;
  total_amount: number | null;
  products: OrderProduct[];
}

export default function OrderReturn() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<number | null>(null);
  const [billId, setBillId] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [returnAmount, setReturnAmount] = useState("");
  const [message, setMessage] = useState<string | JSX.Element>("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderProduct | null>(
    null
  );

  const checkAndFetchOrderDetails = async (
    e?: React.FormEvent | null,
    providedBillId?: string
  ) => {
    if (e) e.preventDefault();
    try {
      const currentBillId = providedBillId || billId;
      if (!currentBillId) {
        setMessage("Please provide a bill ID");
        return;
      }

      const orderData = await api.getOrderDetailsFromBill(currentBillId);

      if (orderData.status === "success" && orderData.data) {
        // Check if order has already been returned
        const returnCheck = await api.checkOrderReturn(orderData.data.order_id);

        if (returnCheck.isReturned) {
          setMessage(
            <div>
              <p>This order has already been returned</p>
              <button
                onClick={() => (window.location.href = "/profile")}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Go to Profile
              </button>
            </div>
          );
          return;
        }

        setOrderDetails(orderData.data);
        setMessage("");
      } else {
        setMessage("Error: Order not found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setMessage("Error fetching order details");
    }
  };

  useEffect(() => {
    const billIdFromUrl = searchParams.get("billId");
    const userIdFromUrl = searchParams.get("userId");

    if (userIdFromUrl) {
      setUserId(parseInt(userIdFromUrl));
    }

    if (billIdFromUrl) {
      setBillId(billIdFromUrl);
      checkAndFetchOrderDetails(null, billIdFromUrl);
    }
  }, [searchParams]);

  const safeToFixed = (
    value: number | null | undefined,
    decimals: number = 2
  ): string => {
    if (value === null || value === undefined) return "0.00";
    return Number(value).toFixed(decimals);
  };

  const calculateReturnAmount = (totalAmount: number | null): number => {
    if (totalAmount === null || isNaN(totalAmount)) return 0;
    return totalAmount * 0.9;
  };

  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderDetails) return;
    // Calculate return amount for the entire order
    const calculatedAmount = calculateReturnAmount(orderDetails.total_amount);
    setReturnAmount(calculatedAmount.toFixed(2));
    // Set the first product as the selected product for the entire order return
    setSelectedProduct(orderDetails.products[0]);
    setIsConfirming(true);
  };

  const handleConfirmReturn = async () => {
    if (!orderDetails || !userId) return;

    try {
      const returnData = {
        order_id: orderDetails.order_id,
        prod_id: orderDetails.products[0].prod_id, // Use first product's ID for the entire order
        return_amount: parseFloat(returnAmount),
        user_id: userId,
      };

      console.log("Sending return data:", returnData);

      const response = await api.createOrderReturn(returnData);
      if (response.status === "success") {
        setMessage("Order return processed successfully");
        setTimeout(() => {
          window.location.href = `/profile`;
        }, 2000);
      } else {
        throw new Error(response.message || "Failed to process return");
      }
    } catch (error) {
      console.error("Return error:", error);
      setMessage(
        "Error processing return: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirming(false);
    setReturnAmount("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3"
                />
              </svg>
              Order Return Process
            </h1>
          </div>

          <div className="p-6">
            {!orderDetails ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
                <p className="text-gray-600">Loading order details...</p>
              </div>
            ) : !isConfirming ? (
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h2 className="text-xl font-semibold mb-4 text-blue-800">
                    Order Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-500 text-sm">Order ID</p>
                      <p className="font-semibold text-lg">
                        {orderDetails.order_id}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-500 text-sm">Total Amount</p>
                      <p className="font-semibold text-lg">
                        ${safeToFixed(orderDetails.total_amount)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      Return Amount (10% deducted)
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      $
                      {safeToFixed(
                        calculateReturnAmount(orderDetails.total_amount)
                      )}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Products in Order
                  </h3>
                  <div className="space-y-3">
                    {orderDetails.products.map((product) => (
                      <div
                        key={product.prod_id}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">
                              Product ID: {product.prod_id}
                            </p>
                            <div className="mt-1 space-y-1 text-sm text-gray-600">
                              <p>Quantity: {product.prod_qty}</p>
                              <p>
                                Unit Price: ${safeToFixed(product.prod_price)}
                              </p>
                              <p className="font-medium text-blue-600">
                                Total: ${safeToFixed(product.prod_total_price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleProceedToConfirm}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transform transition-all duration-200 hover:shadow-lg"
                >
                  Proceed with Return
                </button>
              </div>
            ) : (
              <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100">
                <h2 className="text-xl font-semibold mb-6 text-yellow-800">
                  Confirm Return
                </h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
                    <p className="text-gray-700 mb-4">
                      Please confirm that you want to return this order:
                    </p>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                      <p className="text-yellow-800 font-medium">
                        You will receive:
                      </p>
                      <p className="text-3xl font-bold text-yellow-900">
                        ${returnAmount}
                      </p>
                      <p className="text-yellow-600 text-sm mt-1">
                        (10% deduction applied)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleConfirmReturn}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transform transition-all duration-200 hover:shadow-lg"
                    >
                      Confirm Return
                    </button>
                    <button
                      onClick={handleCancelConfirm}
                      className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transform transition-all duration-200 hover:shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  typeof message === "string" &&
                  message.toLowerCase().includes("error")
                    ? "bg-red-50 border border-red-100"
                    : "bg-green-50 border border-green-100"
                }`}
              >
                {typeof message === "string" ? (
                  message
                ) : (
                  <div className="flex flex-col items-center">
                    <p>This order has already been returned</p>
                    <button
                      onClick={() => (window.location.href = "/profile")}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Go to Profile
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
