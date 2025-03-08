"use client";
import { useState } from "react";
import { api } from "@/utils/api";
import { CreateWorkerData } from "@/utils/api";
import { FiUser, FiMail, FiPhone, FiDollarSign } from "react-icons/fi";
import router from "next/router";
import AdminLayout from "../components/admin-layout";
import ProtectedRoute from "../components/protected-route";

export default function AddWorker() {
  const [formData, setFormData] = useState<CreateWorkerData>({
    worker_name: "",
    worker_email: "",
    worker_contact_no: "",
    worker_salary: 0,
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "worker_salary" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.createWorker(formData);
      if (response.status === "success") {
        setMessage({ type: "success", text: "Worker added successfully!" });
        alert("Worker created successfully!");
        // router.replace("/admin");
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
        setFormData({
          worker_name: "",
          worker_email: "",
          worker_contact_no: "",
          worker_salary: 0,
        });
      } else {
        setMessage({ type: "error", text: "Failed to add worker." });
        alert("Failed to add worker.");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add worker." });
      alert("Failed to add worker.");
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white text-center">
                  Add New Worker
                </h2>
              </div>

              {message && (
                <div
                  className={`mx-6 mt-4 p-4 rounded-lg flex items-center ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-5">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FiUser className="mr-2" /> Name
                    </label>
                    <input
                      type="text"
                      name="worker_name"
                      value={formData.worker_name}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                      placeholder="Enter worker's name"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FiMail className="mr-2" /> Email
                    </label>
                    <input
                      type="email"
                      name="worker_email"
                      value={formData.worker_email}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                      placeholder="worker@example.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FiPhone className="mr-2" /> Contact Number
                    </label>
                    <input
                      type="tel"
                      name="worker_contact_no"
                      value={formData.worker_contact_no}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                      placeholder="+880-XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FiDollarSign className="mr-2" /> Salary
                    </label>
                    <input
                      type="number"
                      name="worker_salary"
                      value={formData.worker_salary}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                      placeholder="Enter salary amount"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
                >
                  <span className="mr-2">Add Worker</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
