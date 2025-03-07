"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, AlertTriangle, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simplified filtering states - only need price range for average price
  const [filters, setFilters] = useState({
    avg_price_min: "",
    avg_price_max: "",
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT prod_id, prod_name, prod_price, rating_stars, rating_count
          FROM product
          WHERE prod_price > (
              SELECT AVG(prod_price) 
              FROM product
          ); 
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

  // Simplified filter logic
  useEffect(() => {
    if (!results) return;

    const filtered = results.filter((row) => {
      const avgPriceMatch =
        (!filters.avg_price_min ||
          parseFloat(row.avg_price) >= parseFloat(filters.avg_price_min)) &&
        (!filters.avg_price_max ||
          parseFloat(row.avg_price) <= parseFloat(filters.avg_price_max));

      return avgPriceMatch;
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
            Nested FROM Query Results
          </h1>
          <p className="text-gray-600">
            Analyzing average product prices through nested queries
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
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  name="avg_price_min"
                  placeholder="Min Average Price"
                  value={filters.avg_price_min}
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
                  name="avg_price_max"
                  placeholder="Max Average Price"
                  value={filters.avg_price_max}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Filter
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
                <p className="text-gray-600">Calculating averages...</p>
              </div>
            ) : error ? (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{error}</span>
              </div>
            ) : (
              filteredResults && (
                <div className="animate-fade-in">
                  {/* <div className="mt-6 bg-gray-100 rounded-lg p-4"> */}
                    {/* <h2 className="text-xl font-semibold mb-4">
                      Nested Query Results
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
                    <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                      <p>Total rows: {filteredResults.length}</p>
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
