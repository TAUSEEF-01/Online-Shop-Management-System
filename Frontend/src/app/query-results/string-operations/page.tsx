"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, Search, AlertTriangle, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtering states
  const [filters, setFilters] = useState({
    prod_name: "",
    lower_name: "",
    upper_name: "",
  });

  // Fetch initial query results
  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT prod_name, 
                LOWER(prod_name) AS lower_name, 
                UPPER(prod_name) AS upper_name 
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
      const prodNameMatch = filters.prod_name
        ? String(row.prod_name)
            .toLowerCase()
            .includes(filters.prod_name.toLowerCase())
        : true;

      const lowerNameMatch = filters.lower_name
        ? String(row.lower_name).includes(filters.lower_name)
        : true;

      const upperNameMatch = filters.upper_name
        ? String(row.upper_name).includes(filters.upper_name)
        : true;

      return prodNameMatch && lowerNameMatch && upperNameMatch;
    });

    setFilteredResults(filtered);
  }, [filters, results]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
            String Operations Results
          </h1>
          <p className="text-gray-600">Case transformations on product names</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Filter Section */}
          
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-gray-50">
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
                  type="text"
                  name="lower_name"
                  placeholder="Search Lowercase Name"
                  value={filters.lower_name}
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
                  type="text"
                  name="upper_name"
                  placeholder="Search Uppercase Name"
                  value={filters.upper_name}
                  onChange={handleFilterChange}
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
                <p className="text-gray-600">
                  Processing text transformations...
                </p>
              </div>
            ) : error ? (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{error}</span>
              </div>
            ) : (
              filteredResults && (
                <div className="animate-fade-in">
                  <div className="mt-6 bg-gray-100 rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      String Operations Results
                    </h2>
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
                                <td key={j} className="px-4 py-2">
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
