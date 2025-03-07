"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, AlertTriangle, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtering states
  const [filters, setFilters] = useState({
    avg_price_min: "",
    avg_price_max: "",
    total_price_min: "",
    total_price_max: "",
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT AVG(prod_price) AS avg_price, 
                SUM(prod_price) AS total_price 
          FROM product;
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

  // Apply filters
  useEffect(() => {
    if (!results) return;

    const filtered = results.filter((row) => {
      const avgPriceMatch =
        (!filters.avg_price_min ||
          parseFloat(row.avg_price) >= parseFloat(filters.avg_price_min)) &&
        (!filters.avg_price_max ||
          parseFloat(row.avg_price) <= parseFloat(filters.avg_price_max));

      const totalPriceMatch =
        (!filters.total_price_min ||
          parseFloat(row.total_price) >= parseFloat(filters.total_price_min)) &&
        (!filters.total_price_max ||
          parseFloat(row.total_price) <= parseFloat(filters.total_price_max));

      return avgPriceMatch && totalPriceMatch;
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
            Aggregate Functions Analysis
          </h1>
          <p className="text-gray-600">
            View aggregated product price statistics
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
                    type="number"
                    name={key}
                    placeholder={key.split("_").join(" ").toUpperCase()}
                    value={value}
                    onChange={handleFilterChange}
                    className="w-full p-2 pl-8 border rounded-lg"
                    min="0"
                  />
                  <Filter
                    className="absolute left-2 top-3 text-gray-400"
                    size={18}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-40 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading results...</p>
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center"
              >
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{error}</span>
              </motion.div>
            ) : (
              filteredResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  {/* <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    Aggregate Analysis Results
                  </h2> */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                          {filteredResults.length > 0 &&
                            Object.keys(filteredResults[0]).map((header) => (
                              <th
                                key={header}
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                              >
                                {header.split("_").join(" ")}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.map((row, i) => (
                          <motion.tr
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={i}
                            className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200"
                          >
                            {Object.values(row).map((value: any, j) => (
                              <td
                                key={j}
                                className="px-6 py-4 text-sm text-gray-700"
                              >
                                {typeof value === "number"
                                  ? value.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })
                                  : String(value)}
                              </td>
                            ))}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 text-sm text-gray-500 flex justify-between items-center">
                    <p>Showing {filteredResults.length} results</p>
                    {isLoading && (
                      <p className="text-blue-500">Refreshing data...</p>
                    )}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
