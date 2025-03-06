"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, Search, AlertTriangle, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update filtering states
  const [filters, setFilters] = useState({
    order_id: "",
    order_date: "",
    user_id: "",
    user_address: "",
    total_amt_min: "",
    total_amt_max: "",
    order_status: "",
    user_name: "",
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT *
          FROM order_detail o, bill_detail b
          where o.order_id = b.order_id;
        `);

        if (response.success) {
          setResults(response.data);
          setFilteredResults(response.data);
        } else {
          setError(response.error || "Query execution failed");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while executing the query");
        setResults(null);
        setFilteredResults(null);
      } finally {
        setIsLoading(false);
      }
    };
    handleExecuteQuery();
  }, []);

  // Update filter logic
  useEffect(() => {
    if (!results) return;

    const filtered = results.filter((row) => {
      const orderIdMatch = filters.order_id
        ? String(row.order_id).includes(filters.order_id)
        : true;

      const orderDateMatch = filters.order_date
        ? String(row.order_date).includes(filters.order_date)
        : true;

      const userIdMatch = filters.user_id
        ? String(row.user_id).includes(filters.user_id)
        : true;

      const userAddressMatch = filters.user_address
        ? String(row.user_address)
            .toLowerCase()
            .includes(filters.user_address.toLowerCase())
        : true;

      const totalAmtMatch =
        (!filters.total_amt_min ||
          parseFloat(row.total_amt) >= parseFloat(filters.total_amt_min)) &&
        (!filters.total_amt_max ||
          parseFloat(row.total_amt) <= parseFloat(filters.total_amt_max));

      const statusMatch = filters.order_status
        ? String(row.order_status)
            .toLowerCase()
            .includes(filters.order_status.toLowerCase())
        : true;

      const userNameMatch = filters.user_name
        ? String(row.user_name)
            .toLowerCase()
            .includes(filters.user_name.toLowerCase())
        : true;

      return (
        orderIdMatch &&
        orderDateMatch &&
        userIdMatch &&
        userAddressMatch &&
        totalAmtMatch &&
        statusMatch &&
        userNameMatch
      );
    });

    setFilteredResults(filtered);
  }, [filters, results]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cross Product Query Results
          </h1>
          <p className="text-gray-600">
            Viewing combined data from orders and bill details
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="text-indigo-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Filter Results
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className="relative group">
                  <input
                    type={key.includes("amt") ? "number" : "text"}
                    name={key}
                    placeholder={`Search ${key
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}`}
                    value={value}
                    onChange={handleFilterChange}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-lg bg-white 
                             transition-all duration-200 ease-in-out
                             focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             hover:border-indigo-300"
                  />
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 
                                   group-hover:text-indigo-500 transition-colors duration-200"
                    size={18}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div
                className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 
                            rounded-lg flex items-center animate-fadeIn"
              >
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{error}</span>
              </div>
            ) : (
              filteredResults && (
                <div className="animate-fadeIn">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          {filteredResults.length > 0 &&
                            Object.keys(filteredResults[0]).map((header) => (
                              <th
                                key={header}
                                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 
                                         uppercase tracking-wider"
                              >
                                {header.split("_").join(" ")}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredResults.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            {Object.values(row).map((value: any, j) => (
                              <td
                                key={j}
                                className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                              >
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
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                    <span>Showing {filteredResults.length} results</span>
                    <span>{new Date().toLocaleDateString()}</span>
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
