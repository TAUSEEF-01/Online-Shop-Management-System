// "use client";
// import { useEffect, useState } from "react";
// import { Card, Table, Title, Text } from "@tremor/react";
// import { api } from "../../../utils/api";
// import ProtectedRoute from "../../components/protected-route";

// interface WithClauseResult {
//   prod_id: number;
//   prod_name: string;
//   prod_price: number;
//   rating_stars: number;
// }

// export default function WithClauseResultsPage() {
//   const [withClauseResults, setWithClauseResults] = useState<WithClauseResult[]>([]);

//   useEffect(() => {
//     const fetchWithClauseResults = async () => {
//       try {
//         console.log("Fetching with-clause results...");
//         const response = await api.get('/with-clause');
//         const rows = response?.results || [];
//         setWithClauseResults(rows);
//       } catch (error) {
//         console.error("Error fetching with-clause results:", error);
//       }
//     };

//     fetchWithClauseResults();
//   }, []);

//   return (
//     <ProtectedRoute>
//       <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
//         <Title className="text-2xl font-semibold">With Clause Results</Title>
//         <Text className="mt-2 text-gray-600">Results of the with clause query</Text>
//         <Card className="mt-6 shadow-lg">
//           <Table className="mt-6 border-t border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Product ID</th>
//                 <th className="px-4 py-2 text-left">Product Name</th>
//                 <th className="px-4 py-2 text-left">Product Price</th>
//                 <th className="px-4 py-2 text-left">Rating Stars</th>
//               </tr>
//             </thead>
//             <tbody>
//               {withClauseResults.map((result, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2">{result.prod_id}</td>
//                   <td className="px-4 py-2">{result.prod_name}</td>
//                   <td className="px-4 py-2">{result.prod_price}</td>
//                   <td className="px-4 py-2">{result.rating_stars}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card>
//       </main>
//     </ProtectedRoute>
//   );
// }




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
    prod_price_min: '',
    prod_price_max: '',
    rating_stars_min: '',
    rating_stars_max: '',
    rating_count_min: '',
    rating_count_max: ''
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          WITH high_rated_products AS (
              SELECT prod_id, prod_name,  prod_price, rating_stars, rating_count
              FROM product 
              WHERE rating_stars >= 4
          )
          SELECT * 
          FROM high_rated_products;
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

      const priceMatch = 
        (!filters.prod_price_min || parseFloat(row.prod_price) >= parseFloat(filters.prod_price_min)) &&
        (!filters.prod_price_max || parseFloat(row.prod_price) <= parseFloat(filters.prod_price_max));

      const ratingStarsMatch = 
        (!filters.rating_stars_min || parseFloat(row.rating_stars) >= parseFloat(filters.rating_stars_min)) &&
        (!filters.rating_stars_max || parseFloat(row.rating_stars) <= parseFloat(filters.rating_stars_max));

      const ratingCountMatch = 
        (!filters.rating_count_min || parseFloat(row.rating_count) >= parseFloat(filters.rating_count_min)) &&
        (!filters.rating_count_max || parseFloat(row.rating_count) <= parseFloat(filters.rating_count_max));

      return prodIdMatch && prodNameMatch && priceMatch && ratingStarsMatch && ratingCountMatch;
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
                placeholder="Min Rating Stars"
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
                placeholder="Max Rating Stars"
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
                Results of the With clause query
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