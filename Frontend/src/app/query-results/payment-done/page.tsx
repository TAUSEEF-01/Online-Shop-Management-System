"use client";

import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { AlertTriangle, Filter, Search, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    billId: "",
    billDate: "",
    userId: "",
    orderId: "",
    userName: "",
    minOrderTotalPrice: "",
    maxOrderTotalPrice: "",
    minBillTotalPrice: "",
    maxBillTotalPrice: "",
    payStatus: "",
  });

  useEffect(() => {
    const fetchQueryResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT bill_id, bill_date, user_id, order_id, user_name, 
                 order_total_price, bill_total_price, pay_status 
          FROM bill_detail 
          WHERE pay_status = 'paid';
        `);

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
  }, []);

  useEffect(() => {
    if (!results) return;

    const filtered = results.filter((row) => {
      // Apply filters
      const matches = {
        billId: filters.billId
          ? String(row.bill_id).includes(filters.billId)
          : true,
        billDate: filters.billDate
          ? String(row.bill_date).includes(filters.billDate)
          : true,
        userId: filters.userId
          ? String(row.user_id).includes(filters.userId)
          : true,
        orderId: filters.orderId
          ? String(row.order_id).includes(filters.orderId)
          : true,
        userName: filters.userName
          ? String(row.user_name)
              .toLowerCase()
              .includes(filters.userName.toLowerCase())
          : true,
        minOrderTotalPrice: filters.minOrderTotalPrice
          ? parseFloat(row.order_total_price) >=
            parseFloat(filters.minOrderTotalPrice)
          : true,
        maxOrderTotalPrice: filters.maxOrderTotalPrice
          ? parseFloat(row.order_total_price) <=
            parseFloat(filters.maxOrderTotalPrice)
          : true,
        minBillTotalPrice: filters.minBillTotalPrice
          ? parseFloat(row.bill_total_price) >=
            parseFloat(filters.minBillTotalPrice)
          : true,
        maxBillTotalPrice: filters.maxBillTotalPrice
          ? parseFloat(row.bill_total_price) <=
            parseFloat(filters.maxBillTotalPrice)
          : true,
        payStatus: filters.payStatus
          ? String(row.pay_status)
              .toLowerCase()
              .includes(filters.payStatus.toLowerCase())
          : true,
      };

      return Object.values(matches).every(Boolean);
    });

    setFilteredResults(filtered);
  }, [filters, results]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
            Completed Payments
          </h1>
          <p className="text-gray-600">
            View all completed payment transactions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Filter Results
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className="relative">
                  <input
                    type={key.includes("price") ? "number" : "text"}
                    name={key}
                    placeholder={key.split(/(?=[A-Z])/).join(" ")}
                    value={value}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                    className="w-full p-2 pl-8 border rounded-lg"
                  />
                  {key.includes("Name") ? (
                    <Search
                      className="absolute left-2 top-3 text-gray-400"
                      size={18}
                    />
                  ) : (
                    <Filter
                      className="absolute left-2 top-3 text-gray-400"
                      size={18}
                    />
                  )}
                </div>
              ))}
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
                  {/* <div className="mt-6 bg-gray-100 rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Payment Records
                    </h2> */}
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
                // </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
