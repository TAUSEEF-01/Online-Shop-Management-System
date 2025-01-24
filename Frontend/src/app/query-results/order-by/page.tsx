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
    prod_id: '',
    prod_name: '',
    prod_quantity_min: '',
    prod_quantity_max: '',
    prod_price_min: '',
    prod_price_max: '',
    rating_stars_min: '',
    rating_stars_max: '',
    rating_count_min: '',
    rating_count_max: '',
    prod_discount_min: '',
    prod_discount_max: ''
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT prod_id, prod_name, prod_quantity, prod_price, rating_stars, rating_count, prod_discount 
          FROM product 
          ORDER BY prod_price DESC;
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
      const prodIdMatch = filters.prod_id
        ? String(row.prod_id).includes(filters.prod_id)
        : true;

      const prodNameMatch = filters.prod_name
        ? String(row.prod_name).toLowerCase().includes(filters.prod_name.toLowerCase())
        : true;

      const quantityMatch = 
        (!filters.prod_quantity_min || parseFloat(row.prod_quantity) >= parseFloat(filters.prod_quantity_min)) &&
        (!filters.prod_quantity_max || parseFloat(row.prod_quantity) <= parseFloat(filters.prod_quantity_max));

      const priceMatch = 
        (!filters.prod_price_min || parseFloat(row.prod_price) >= parseFloat(filters.prod_price_min)) &&
        (!filters.prod_price_max || parseFloat(row.prod_price) <= parseFloat(filters.prod_price_max));

      const ratingStarsMatch = 
        (!filters.rating_stars_min || parseFloat(row.rating_stars) >= parseFloat(filters.rating_stars_min)) &&
        (!filters.rating_stars_max || parseFloat(row.rating_stars) <= parseFloat(filters.rating_stars_max));

      const ratingCountMatch = 
        (!filters.rating_count_min || parseFloat(row.rating_count) >= parseFloat(filters.rating_count_min)) &&
        (!filters.rating_count_max || parseFloat(row.rating_count) <= parseFloat(filters.rating_count_max));

      const discountMatch = 
        (!filters.prod_discount_min || parseFloat(row.prod_discount) >= parseFloat(filters.prod_discount_min)) &&
        (!filters.prod_discount_max || parseFloat(row.prod_discount) <= parseFloat(filters.prod_discount_max));

      return prodIdMatch && prodNameMatch && quantityMatch && priceMatch && 
             ratingStarsMatch && ratingCountMatch && discountMatch;
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
                name="prod_quantity_min"
                placeholder="Min Quantity"
                value={filters.prod_quantity_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="prod_quantity_max"
                placeholder="Max Quantity"
                value={filters.prod_quantity_max}
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
                name="rating_stars_min"
                placeholder="Min Rating"
                value={filters.rating_stars_min}
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
                name="rating_stars_max"
                placeholder="Max Rating"
                value={filters.rating_stars_max}
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
                name="rating_count_min"
                placeholder="Min Rating Count"
                value={filters.rating_count_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="rating_count_max"
                placeholder="Max Rating Count"
                value={filters.rating_count_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="prod_discount_min"
                placeholder="Min Discount"
                value={filters.prod_discount_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
                max="100"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="prod_discount_max"
                placeholder="Max Discount"
                value={filters.prod_discount_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
                max="100"
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
                Results of the order by query
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