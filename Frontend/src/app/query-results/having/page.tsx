'use client';
import { useEffect, useState } from 'react';
import { api, QueryResult } from '../../../utils/api';
import { Filter, Search, AlertTriangle, Database } from 'lucide-react';

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtering states
  const [filters, setFilters] = useState({
    user_id: '',
    order_count_min: '',
    order_count_max: '',
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT user_id, COUNT(*) AS order_count 
          FROM orders 
          GROUP BY user_id 
          HAVING COUNT(*) > 5;
        `);
        if (response.success) {
          setResults(response.data);
          setFilteredResults(response.data);
        } else {
          setError(response.error || 'Query execution failed');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while executing the query');
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
      const userIdMatch = filters.user_id
        ? String(row.user_id).includes(filters.user_id)
        : true;

      const orderCountMatch =
        (!filters.order_count_min ||
          parseInt(row.order_count) >= parseInt(filters.order_count_min)) &&
        (!filters.order_count_max ||
          parseInt(row.order_count) <= parseInt(filters.order_count_max));

      return userIdMatch && orderCountMatch;
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
            Having Query Results
          </h1>
          <p className="text-gray-600">
            View users with high order frequency
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="user_id"
                  placeholder="Search User ID"
                  value={filters.user_id}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search className="absolute left-2 top-3 text-gray-400" size={18} />
              </div>
              {['order_count_min', 'order_count_max'].map(key => (
                <div key={key} className="relative">
                  <input
                    type="number"
                    name={key}
                    placeholder={key.split('_').join(' ').toUpperCase()}
                    value={filters[key]}
                    onChange={handleFilterChange}
                    className="w-full p-2 pl-8 border rounded-lg"
                    min="0"
                  />
                  <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
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
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{error}</span>
              </div>
            ) : (
              filteredResults && (
                <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  {/* <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    Users with High Order Frequency
                  </h2> */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                          {filteredResults.length > 0 &&
                            Object.keys(filteredResults[0]).map((header) => (
                              <th
                                key={header}
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                              >
                                {header.split('_').join(' ')}
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.map((row, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-100 hover:bg-purple-50/50 transition-colors duration-200"
                          >
                            {Object.values(row).map((value: any, j) => (
                              <td
                                key={j}
                                className="px-6 py-4 text-sm text-gray-700"
                              >
                                {typeof value === 'object'
                                  ? JSON.stringify(value)
                                  : String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 text-sm text-gray-500 flex justify-between items-center">
                    <p>Showing {filteredResults.length} results</p>
                    {isLoading && (
                      <p className="text-purple-500">Refreshing data...</p>
                    )}
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
