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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Return</h1>

      {!orderDetails ? (
        <div className="flex items-center justify-center">
          {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="ml-2">Fetching order details...</p> */}
        </div>
      ) : !isConfirming ? (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">
                  Order ID: {orderDetails?.order_id}
                </p>
                <p className="mt-2">
                  Original Amount: ${safeToFixed(orderDetails?.total_amount)}
                </p>
                <p className="text-blue-600 mb-4">
                  Return Amount (10% deducted): $
                  {safeToFixed(
                    calculateReturnAmount(orderDetails?.total_amount)
                  )}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Products in this Order:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {orderDetails?.products.map((product) => (
                    <div
                      key={product.prod_id}
                      className="mb-2 p-2 border-b last:border-0"
                    >
                      <div>
                        <p>Product ID: {product.prod_id}</p>
                        <div className="text-sm text-gray-600">
                          <p>Quantity: {product.prod_qty}</p>
                          <p>Price: ${safeToFixed(product.prod_price)}</p>
                          <p>Total: ${safeToFixed(product.prod_total_price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleProceedToConfirm}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Return Entire Order
                </button>
              </div>
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
            typeof message === "string" &&
            message.toLowerCase().includes("error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
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
  );
}
