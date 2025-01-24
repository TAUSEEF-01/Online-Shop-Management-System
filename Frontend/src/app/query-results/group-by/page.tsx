"use client";
import { useEffect, useState } from "react";
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface GroupByResult {
  user_id: number;
  order_count: number;
}

export default function GroupByResultsPage() {
  const [groupByResults, setGroupByResults] = useState<GroupByResult[]>([]);

  useEffect(() => {
    const fetchGroupByResults = async () => {
      try {
        console.log("Fetching group-by results...");
        const response = await api.get('/group-by');
        const rows = response?.results || [];
        setGroupByResults(rows);
      } catch (error) {
        console.error("Error fetching group-by results:", error);
      }
    };

    fetchGroupByResults();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">Group By Results</Title>
        <Text className="mt-2 text-gray-600">Results of the group by query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Order Count</th>
              </tr>
            </thead>
            <tbody>
              {groupByResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.user_id}</td>
                  <td className="px-4 py-2">{result.order_count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
