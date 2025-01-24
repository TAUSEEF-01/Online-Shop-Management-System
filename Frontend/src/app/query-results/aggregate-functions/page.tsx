"use client";
import { useEffect, useState } from "react";
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface AggregateFunctionsResult {
  avg_price: number;
  total_price: number;
}

export default function AggregateFunctionsResultsPage() {
  const [aggregateFunctionsResults, setAggregateFunctionsResults] = useState<AggregateFunctionsResult[]>([]);

  useEffect(() => {
    const fetchAggregateFunctionsResults = async () => {
      try {
        console.log("Fetching aggregate functions results...");
        const response = await api.get('/aggregate-functions');
        const rows = response?.results || [];
        setAggregateFunctionsResults(rows);
      } catch (error) {
        console.error("Error fetching aggregate functions results:", error);
      }
    };

    fetchAggregateFunctionsResults();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">Aggregate Functions Results</Title>
        <Text className="mt-2 text-gray-600">Results of the aggregate functions query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Average Price</th>
                <th className="px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {aggregateFunctionsResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.avg_price}</td>
                  <td className="px-4 py-2">{result.total_price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
