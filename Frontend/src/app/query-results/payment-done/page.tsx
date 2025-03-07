"use client";

import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { AlertTriangle, Filter, Search, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("paid");

  const togglePaymentStatus = () => {
    setPaymentStatus(paymentStatus === "paid" ? "unpaid" : "paid");
  };

  const [userFilters, setUserFilters] = useState({
    userId: "",
    userName: "",
  });

  useEffect(() => {
    const fetchQueryResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = `
          SELECT bill_id, bill_date, user_id, order_id, user_name, 
                  bill_total_price, pay_status 
          FROM bill_detail 
          WHERE pay_status = '${paymentStatus}'
        `;

        if (userFilters.userId) {
          query += ` AND user_id = '${userFilters.userId}'`;
        }
        if (userFilters.userName) {
          query += ` AND LOWER(user_name) LIKE LOWER('%${userFilters.userName}%')`;
        }

        query += " ORDER BY bill_id ASC";

        const response: QueryResult = await api.executeRawQuery(query);

        if (response.success) {
          setResults(response.data);
          setFilteredResults(response.data);
        } else {
          setError(response.error || "Query execution failed.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while executing the query.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQueryResults();
  }, [paymentStatus, userFilters]);

  const handleUserFilterChange = (field: string, value: string) => {
    setUserFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
            Completed Payments
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Database className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              </div>
              <p className="text-gray-600">
              Currently showing {paymentStatus} payment transactions
            </p>
              <button
                onClick={togglePaymentStatus}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
              >
                <Filter size={18} />
                Show {paymentStatus === "paid" ? "Unpaid" : "Paid"} Payments
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by User ID"
                  value={userFilters.userId}
                  onChange={(e) =>
                    handleUserFilterChange("userId", e.target.value)
                  }
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by User Name"
                  value={userFilters.userName}
                  onChange={(e) =>
                    handleUserFilterChange("userName", e.target.value)
                  }
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
            </div>
            
          </div>

          {/* Results Section */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-40 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading payments...</p>
              </div>
            ) : error ? (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{error}</span>
              </div>
            ) : (
              filteredResults && (
                <div className="animate-fade-in">
                  <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-200">
                        <tr>
                          {filteredResults.length > 0 &&
                            Object.keys(filteredResults[0]).map((header) => (
                              <th
                                key={header}
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {header.replace(/_/g, " ")}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            {Object.values(row).map((value, j) => (
                              <td key={j} className="px-4 py-3 text-sm">
                                {typeof value === "object"
                                  ? JSON.stringify(value)
                                  : String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <p>Showing {filteredResults.length} payments</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
