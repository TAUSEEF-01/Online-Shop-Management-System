"use client";
import { useEffect, useState } from "react";
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface OuterJoinResult {
  order_id: number;
  user_id: number;
  order_date: string;
  order_status: string;
  user_name: string;
}

export default function OuterJoinResultsPage() {
  const [outerJoinResults, setOuterJoinResults] = useState<OuterJoinResult[]>([]);

  useEffect(() => {
    const fetchOuterJoinResults = async () => {
      try {
        console.log("Fetching outer join results...");
        const response = await api.get('/outer-join');
        const rows = response?.results || [];
        setOuterJoinResults(rows);
      } catch (error) {
        console.error("Error fetching outer join results:", error);
      }
    };

    fetchOuterJoinResults();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">Outer Join Results</Title>
        <Text className="mt-2 text-gray-600">Results of the outer join query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Order Date</th>
                <th className="px-4 py-2 text-left">Order Status</th>
                <th className="px-4 py-2 text-left">User Name</th>
              </tr>
            </thead>
            <tbody>
              {outerJoinResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.order_id}</td>
                  <td className="px-4 py-2">{result.user_id}</td>
                  <td className="px-4 py-2">{result.order_date}</td>
                  <td className="px-4 py-2">{result.order_status}</td>
                  <td className="px-4 py-2">{result.user_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
