"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import ProtectedRoute from "../components/protected-route";
import AdminLayout from "../components/admin-layout";

interface Order {
  order_id: number;
  order_date: string;
  user_id: number;
  user_address: string;
  total_amt: number;
  order_status: string;
}

export default function UpdateOrderStatus() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getAllOrders();
        if (response.status === "success") {
          setOrders(response.data);
        } else {
          setMessage("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setMessage("An error occurred while fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  const handleToggleStatus = async (orderId: number, currentStatus: string) => {
    const newStatus =
      currentStatus === "delivered" ? "in process" : "delivered";

    try {
      const response = await api.updateOrderStatus(orderId, newStatus);
      if (response.status === "success") {
        setMessage("Order status updated successfully.");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId
              ? { ...order, order_status: newStatus }
              : order
          )
        );
      } else {
        setMessage("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setMessage("An error occurred while updating the order status.");
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <main className="p-6 md:p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl mx-auto max-w-7xl shadow-lg min-h-screen">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Update Order Status
            </h1>
            <p className="text-gray-600">
              Change the status of an existing order.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Order ID</th>
                    <th className="py-2 px-4 border-b">Order Date</th>
                    <th className="py-2 px-4 border-b">User ID</th>
                    <th className="py-2 px-4 border-b">User Address</th>
                    <th className="py-2 px-4 border-b">Total Amount</th>
                    <th className="py-2 px-4 border-b">Order Status</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="py-2 px-4 border-b">{order.order_id}</td>
                      <td className="py-2 px-4 border-b">{order.order_date}</td>
                      <td className="py-2 px-4 border-b">{order.user_id}</td>
                      <td className="py-2 px-4 border-b">
                        {order.user_address}
                      </td>
                      <td className="py-2 px-4 border-b">${order.total_amt}</td>
                      <td className="py-2 px-4 border-b">
                        {order.order_status}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              order.order_id,
                              order.order_status
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md shadow transition-all hover:shadow-md"
                        >
                          Change to {order.order_status === "delivered" ? "in process" : "delivered"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {message && (
              <div className="mt-4 text-center text-gray-700">{message}</div>
            )}
          </div>
        </main>
      </AdminLayout>
    </ProtectedRoute>
  );
}
