"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, Search, AlertTriangle, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>("1");

  // Filtering states
  const [filters, setFilters] = useState({
    prod_name: "",
    min_price: "",
    max_price: "",
    min_qty: "",
    max_qty: "",
    rating_stars: "",
  });

  const handleExecuteQuery = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: QueryResult = await api.executeRawQuery(`
        SELECT * FROM order_summary WHERE user_id = ${userId};
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

  useEffect(() => {
    handleExecuteQuery();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!results) return;

    const filtered = results.filter((row) => {
      const nameMatch = filters.prod_name
        ? String(row.prod_name)
            .toLowerCase()
            .includes(filters.prod_name.toLowerCase())
        : true;

      const priceMatch =
        (!filters.min_price ||
          parseFloat(row.prod_price) >= parseFloat(filters.min_price)) &&
        (!filters.max_price ||
          parseFloat(row.prod_price) <= parseFloat(filters.max_price));

      const qtyMatch =
        (!filters.min_qty ||
          parseFloat(row.prod_quantity) >= parseFloat(filters.min_qty)) &&
        (!filters.max_qty ||
          parseFloat(row.prod_quantity) <= parseFloat(filters.max_qty));

      const ratingMatch = filters.rating_stars
        ? row.rating_stars >= parseFloat(filters.rating_stars)
        : true;

      return nameMatch && priceMatch && qtyMatch && ratingMatch;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
            Query Results using View
          </h1>
          <p className="text-gray-600">
            Viewing combined data with matching records
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Add User ID Input Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">
                  User Orders
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium">User ID:</label>
                <input
                  type="number"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter ID"
                  min="1"
                />
                <button
                  onClick={handleExecuteQuery}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Database size={18} />
                  Fetch Orders
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          {/* <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Filter Results
              </h2>
            </div>


            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="prod_name"
                  placeholder="Search Product Name"
                  value={filters.prod_name}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="min_price"
                  placeholder="Min Price"
                  value={filters.min_price}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="max_price"
                  placeholder="Max Price"
                  value={filters.max_price}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="min_qty"
                  placeholder="Min Quantity"
                  value={filters.min_qty}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="max_qty"
                  placeholder="Max Quantity"
                  value={filters.max_qty}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="rating_stars"
                  placeholder="Min Rating"
                  value={filters.rating_stars}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                  max="5"
                  min="0"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div> */}

          {/* Results Section with enhanced styling */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-40 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading results...</p>
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
                                {header}
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
                            {Object.values(row).map((value: any, j) => (
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
                  <p className="mt-4 text-sm text-gray-500 text-right">
                    Total rows: {filteredResults.length}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
