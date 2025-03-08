"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/utils/api";

interface OrderDetails {
  order_id: number;
  prod_id: number;
  total_amount: number | null;
}

export default function OrderReturn() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<number | null>(null);
  const [billId, setBillId] = useState("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [returnAmount, setReturnAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

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
          setMessage("This order has already been returned");
          setTimeout(() => {
            window.location.href = "/profile";
          }, 2000);
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
    const calculatedAmount = calculateReturnAmount(orderDetails.total_amount);
    setReturnAmount(calculatedAmount.toFixed(2));
    setIsConfirming(true);
  };

  const handleConfirmReturn = async () => {
    if (!orderDetails || !userId) return;

    try {
      const returnData = {
        order_id: orderDetails.order_id,
        prod_id: orderDetails.prod_id,
        return_amount: parseFloat(returnAmount),
        user_id: userId,
      };

      const response = await api.createOrderReturn(returnData);
      if (response.status === "success") {
        setMessage("Order return processed successfully");
        // Redirect to profile page
        window.location.href = `/profile`;
      }
      setOrderDetails(null);
      setBillId("");
      setReturnAmount("");
      setIsConfirming(false);
    } catch (error) {
      setMessage("Error processing return");
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirming(false);
    setReturnAmount("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Return</h1>

      {!orderDetails ? (
        <form onSubmit={checkAndFetchOrderDetails} className="space-y-4">
          <div>
            <label className="block mb-2">Bill ID:</label>
            <input
              type="text"
              value={billId}
              onChange={(e) => setBillId(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Fetch Order Details
          </button>
        </form>
      ) : !isConfirming ? (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p>Order ID: {orderDetails.order_id}</p>
              <p>Product ID: {orderDetails.prod_id}</p>
              <p>Original Amount: ${safeToFixed(orderDetails.total_amount)}</p>
              <p className="text-blue-600">
                Return Amount (10% deducted): $
                {safeToFixed(calculateReturnAmount(orderDetails.total_amount))}
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleProceedToConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Proceed to Return
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Confirm Return</h2>
          <div className="space-y-4">
            <p>Are you sure you want to return this order?</p>
            <p className="font-semibold">
              You will receive: ${returnAmount}
              <span className="text-gray-500 text-sm ml-2">
                (10% deduction applied)
              </span>
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmReturn}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Confirm Return
              </button>
              <button
                onClick={handleCancelConfirm}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
