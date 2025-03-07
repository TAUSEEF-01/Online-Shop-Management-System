"use client";

import { useEffect, useState } from "react";
import { Table, Title, Text } from "@tremor/react";
import { api } from "@/utils/api";
import ProtectedRoute from "../components/protected-route";
import AdminLayout from "../components/admin-layout";

interface Worker {
  worker_id: number;
  worker_name: string;
  worker_email: string;
  worker_contact_no: string;
  worker_salary: number;
}

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setIsLoading(true);
        const response = await api.getAllWorkers();
        setWorkers(response); // API directly returns the workers array
      } catch (error) {
        console.error("Failed to fetch workers data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <main className="p-6 md:p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl mx-auto max-w-7xl shadow-lg min-h-screen">
          <div className="mb-8">
            <Title className="text-3xl font-bold text-gray-800 mb-2">
              Workers Information
            </Title>
            <Text className="text-gray-600">
              View and manage worker details
            </Text>
          </div>

          {isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <p>Loading workers data...</p>
            </div>
          ) : workers.length === 0 ? (
            <div className="h-[400px] flex items-center justify-center">
              <p>No workers data available</p>
            </div>
          ) : (
            <Table className="mt-6 border-t border-gray-200">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-4 py-2 text-left">Worker ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Contact Number</th>
                  <th className="px-4 py-2 text-right">Salary</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr
                    key={worker.worker_id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{worker.worker_id}</td>
                    <td className="px-4 py-2">{worker.worker_name}</td>
                    <td className="px-4 py-2">{worker.worker_email}</td>
                    <td className="px-4 py-2">{worker.worker_contact_no}</td>
                    <td className="px-4 py-2 text-right font-medium">
                      ${worker.worker_salary.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </main>
      </AdminLayout>
    </ProtectedRoute>
  );
}
