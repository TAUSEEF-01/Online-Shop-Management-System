"use client";
import { useEffect, useState } from "react";
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface WithClauseResult {
  prod_id: number;
  prod_name: string;
  prod_price: number;
  rating_stars: number;
}

export default function WithClauseResultsPage() {
  const [withClauseResults, setWithClauseResults] = useState<WithClauseResult[]>([]);

  useEffect(() => {
    const fetchWithClauseResults = async () => {
      try {
        console.log("Fetching with-clause results...");
        const response = await api.get('/with-clause');
        const rows = response?.results || [];
        setWithClauseResults(rows);
      } catch (error) {
        console.error("Error fetching with-clause results:", error);
      }
    };

    fetchWithClauseResults();
  }, []);

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">With Clause Results</Title>
        <Text className="mt-2 text-gray-600">Results of the with clause query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Product Price</th>
                <th className="px-4 py-2 text-left">Rating Stars</th>
              </tr>
            </thead>
            <tbody>
              {withClauseResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.prod_id}</td>
                  <td className="px-4 py-2">{result.prod_name}</td>
                  <td className="px-4 py-2">{result.prod_price}</td>
                  <td className="px-4 py-2">{result.rating_stars}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
