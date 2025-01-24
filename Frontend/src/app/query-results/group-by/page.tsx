'use client';
import { useEffect, useState } from 'react';
import { api, QueryResult } from '../../../utils/api';
import { Filter, Search, AlertTriangle } from 'lucide-react';

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtering states
  const [filters, setFilters] = useState({
    user_id: '',
    order_count_min: '',
    order_count_max: ''
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT user_id, COUNT(*) AS order_count 
          FROM orders 
          GROUP BY user_id;
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

    const filtered = results.filter(row => {
      const userIdMatch = filters.user_id
        ? String(row.user_id).includes(filters.user_id)
        : true;

      const orderCountMatch = 
        (!filters.order_count_min || parseInt(row.order_count) >= parseInt(filters.order_count_min)) &&
        (!filters.order_count_max || parseInt(row.order_count) <= parseInt(filters.order_count_max));

      return userIdMatch && orderCountMatch;
    });

    setFilteredResults(filtered);
  }, [filters, results]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="p-6">
          {/* Filters */}
          <div className="mb-4 grid grid-cols-3 gap-4">
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
            <div className="relative">
              <input
                type="number"
                name="order_count_min"
                placeholder="Min Order Count"
                value={filters.order_count_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="order_count_max"
                placeholder="Max Order Count"
                value={filters.order_count_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="mr-3 text-red-500" size={24} />
              <span>{error}</span>
            </div>
          )}

          {/* Results Display */}
          {filteredResults && (
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">
                Results of the group by query
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      {filteredResults.length > 0 &&
                        Object.keys(filteredResults[0]).map((header) => (
                          <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
                        {Object.values(row).map((value: any, j) => (
                          <td key={j} className="px-4 py-3 text-sm">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
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
          )}
        </div>
      </div>
    </div>
  );
}