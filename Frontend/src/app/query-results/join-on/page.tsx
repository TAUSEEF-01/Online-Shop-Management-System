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
    order_id: '',
    prod_id: '',
    prod_qty_min: '',
    prod_qty_max: '',
    prod_price_min: '',
    prod_price_max: '',
    total_price_min: '',
    total_price_max: '',
    prod_name: '',
    rating_min: '',
    rating_max: '',
    prod_keywords: ''
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT * 
      FROM order_detail od 
      JOIN product p 
      ON od.prod_id = p.prod_id;
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
      const orderIdMatch = filters.order_id
        ? String(row.order_id).includes(filters.order_id)
        : true;

      const prodIdMatch = filters.prod_id
        ? String(row.prod_id).includes(filters.prod_id)
        : true;

      const prodQtyMatch = 
        (!filters.prod_qty_min || parseFloat(row.prod_qty) >= parseFloat(filters.prod_qty_min)) &&
        (!filters.prod_qty_max || parseFloat(row.prod_qty) <= parseFloat(filters.prod_qty_max));

      const prodPriceMatch = 
        (!filters.prod_price_min || parseFloat(row.prod_price) >= parseFloat(filters.prod_price_min)) &&
        (!filters.prod_price_max || parseFloat(row.prod_price) <= parseFloat(filters.prod_price_max));

      const totalPriceMatch = 
        (!filters.total_price_min || parseFloat(row.prod_total_price) >= parseFloat(filters.total_price_min)) &&
        (!filters.total_price_max || parseFloat(row.prod_total_price) <= parseFloat(filters.total_price_max));

      const prodNameMatch = filters.prod_name
        ? String(row.prod_name).toLowerCase().includes(filters.prod_name.toLowerCase())
        : true;

      const ratingMatch = 
        (!filters.rating_min || parseFloat(row.rating_stars) >= parseFloat(filters.rating_min)) &&
        (!filters.rating_max || parseFloat(row.rating_stars) <= parseFloat(filters.rating_max));

      const keywordsMatch = filters.prod_keywords
        ? String(row.prod_keywords).toLowerCase().includes(filters.prod_keywords.toLowerCase())
        : true;

      return orderIdMatch && prodIdMatch && prodQtyMatch && prodPriceMatch && 
             totalPriceMatch && prodNameMatch && ratingMatch && keywordsMatch;
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
                name="order_id"
                placeholder="Search Order ID"
                value={filters.order_id}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="text"
                name="prod_id"
                placeholder="Search Product ID"
                value={filters.prod_id}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="prod_qty_min"
                placeholder="Min Quantity"
                value={filters.prod_qty_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="prod_qty_max"
                placeholder="Max Quantity"
                value={filters.prod_qty_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="prod_price_min"
                placeholder="Min Price"
                value={filters.prod_price_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="prod_price_max"
                placeholder="Max Price"
                value={filters.prod_price_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="total_price_min"
                placeholder="Min Total Price"
                value={filters.total_price_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="total_price_max"
                placeholder="Max Total Price"
                value={filters.total_price_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="text"
                name="prod_name"
                placeholder="Search Product Name"
                value={filters.prod_name}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="rating_min"
                placeholder="Min Rating"
                value={filters.rating_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
                max="5"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="rating_max"
                placeholder="Max Rating"
                value={filters.rating_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
                max="5"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="text"
                name="prod_keywords"
                placeholder="Search Keywords"
                value={filters.prod_keywords}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
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
                Results of the join on query
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