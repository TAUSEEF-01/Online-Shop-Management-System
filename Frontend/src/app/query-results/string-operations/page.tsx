"use client";
import { useEffect, useState } from "react";
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface StringOperationsResult {
  prod_name: string;
  lower_name: string;
  upper_name: string;
}

export default function StringOperationsResultsPage() {
  const [stringOperationsResults, setStringOperationsResults] = useState<StringOperationsResult[]>([]);

  useEffect(() => {
    const fetchStringOperationsResults = async () => {
      try {
        console.log("Fetching string operations results...");
        const response = await api.get('/string-operations');
        const rows = response?.results || [];
        setStringOperationsResults(rows);
      } catch (error) {
        console.error("Error fetching string operations results:", error);
      }
    };

    fetchStringOperationsResults();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">String Operations Results</Title>
        <Text className="mt-2 text-gray-600">Results of the string operations query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Lowercase Name</th>
                <th className="px-4 py-2 text-left">Uppercase Name</th>
              </tr>
            </thead>
            <tbody>
              {stringOperationsResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.prod_name}</td>
                  <td className="px-4 py-2">{result.lower_name}</td>
                  <td className="px-4 py-2">{result.upper_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
