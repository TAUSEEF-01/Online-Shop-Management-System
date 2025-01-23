'use client'

import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { api } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import ProtectedRoute from '../components/protected-route';

interface BillDetail {
  bill_id: number;
  bill_date: string;
  user_id: number;
  order_id: number;
  user_name: string;
  prod_id: number;
  prod_qty: number;
  prod_price: number;
  prod_total_price: number;
  order_total_price: number;
  bill_total_price: number;
  pay_status: string;
}

export default function Billing() {
  const [billDetails, setBillDetails] = useState<BillDetail[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        if (orderId) {
          const response = await api.getBillDetailsByOrderId(Number(orderId));
          console.log("Bill details response:", response.data);

          if (response.status === "success" && response.data) {
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
          {billDetails && billDetails.length > 0 ? (
            <Card className="shadow-lg rounded-lg">
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="text-xl">Bill Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Bill Date:</strong> {billDetails[0]?.bill_date}</p>
                  <p><strong>User Name:</strong> {billDetails[0]?.user_name}</p>
                  <p><strong>Product ID:</strong> {billDetails[0]?.prod_id}</p>
                  <p><strong>Product Quantity:</strong> {billDetails[0]?.prod_qty}</p>
                  <p><strong>Product Price:</strong> {billDetails[0]?.prod_price}</p>
                  <p><strong>Product Total Price:</strong> {billDetails[0]?.prod_total_price}</p>
                  <p><strong>Order Total Price:</strong> {billDetails[0]?.order_total_price}</p>
                  <p><strong>Bill Total Price:</strong> {billDetails[0]?.bill_total_price}</p>
                  <p><strong>Payment Status:</strong> {billDetails[0]?.pay_status}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-gray-500">No bill details available.</p>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
