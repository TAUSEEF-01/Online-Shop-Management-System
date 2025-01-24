"use client";
import { useEffect, useState } from "react";
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface JoinOnResult {
  order_id: number;
  prod_id: number;
  prod_name: string;
  prod_qty: number;
  prod_price: number;
  prod_total_price: number;
}

export default function JoinOnResultsPage() {
  const [joinOnResults, setJoinOnResults] = useState<JoinOnResult[]>([]);

  useEffect(() => {
    const fetchJoinOnResults = async () => {
      try {
        console.log("Fetching join-on results...");
        const response = await api.get('/join-on');
        const rows = response?.results || [];
        setJoinOnResults(rows);
      } catch (error) {
        console.error("Error fetching join-on results:", error);
      }
    };

    fetchJoinOnResults();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">Join On Results</Title>
        <Text className="mt-2 text-gray-600">Results of the join on query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {joinOnResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.order_id}</td>
                  <td className="px-4 py-2">{result.prod_id}</td>
                  <td className="px-4 py-2">{result.prod_name}</td>
                  <td className="px-4 py-2">{result.prod_qty}</td>
                  <td className="px-4 py-2">{result.prod_price}</td>
                  <td className="px-4 py-2">{result.prod_total_price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
