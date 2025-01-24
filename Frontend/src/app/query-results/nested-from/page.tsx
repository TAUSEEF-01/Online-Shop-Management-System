"use client";
import { useEffect, useState } from "react";
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface NestedFromResult {
  avg_price: number;
}

export default function NestedFromResultsPage() {
  const [nestedFromResults, setNestedFromResults] = useState<NestedFromResult[]>([]);

  useEffect(() => {
    const fetchNestedFromResults = async () => {
      try {
        console.log("Fetching nested-from results...");
        const response = await api.get('/nested-from');
        const rows = response?.results || [];
        setNestedFromResults(rows);
      } catch (error) {
        console.error("Error fetching nested-from results:", error);
      }
    };

    fetchNestedFromResults();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">Nested From Results</Title>
        <Text className="mt-2 text-gray-600">Results of the nested from query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Average Price</th>
              </tr>
            </thead>
            <tbody>
              {nestedFromResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.avg_price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
