// "use client";
// import { useEffect, useState } from "react";
// import { Card, Table, Title, Text } from "@tremor/react";
// import { api } from "../../../utils/api";
// import ProtectedRoute from "../../components/protected-route";

// interface AggregateFunctionsResult {
//   avg_price: number;
//   total_price: number;
// }

// export default function AggregateFunctionsResultsPage() {
//   const [aggregateFunctionsResults, setAggregateFunctionsResults] = useState<AggregateFunctionsResult[]>([]);

//   useEffect(() => {
//     const fetchAggregateFunctionsResults = async () => {
//       try {
//         console.log("Fetching aggregate functions results...");
//         const response = await api.get('/aggregate-functions');
//         const rows = response?.results || [];
//         setAggregateFunctionsResults(rows);
//       } catch (error) {
//         console.error("Error fetching aggregate functions results:", error);
//       }
//     };

//     fetchAggregateFunctionsResults();
//   }, []);

//   return (
//     <ProtectedRoute>
//       <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
//         <Title className="text-2xl font-semibold">Aggregate Functions Results</Title>
//         <Text className="mt-2 text-gray-600">Results of the aggregate functions query</Text>
//         <Card className="mt-6 shadow-lg">
//           <Table className="mt-6 border-t border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Average Price</th>
//                 <th className="px-4 py-2 text-left">Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {aggregateFunctionsResults.map((result, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2">{result.avg_price}</td>
//                   <td className="px-4 py-2">{result.total_price}</td>
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
    avg_price_min: '',
    avg_price_max: '',
    total_price_min: '',
    total_price_max: ''
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
      const avgPriceMatch =
        (!filters.avg_price_min || parseFloat(row.avg_price) >= parseFloat(filters.avg_price_min)) &&
        (!filters.avg_price_max || parseFloat(row.avg_price) <= parseFloat(filters.avg_price_max));

      const totalPriceMatch =
        (!filters.total_price_min || parseFloat(row.total_price) >= parseFloat(filters.total_price_min)) &&
        (!filters.total_price_max || parseFloat(row.total_price) <= parseFloat(filters.total_price_max));

      return avgPriceMatch && totalPriceMatch;
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
          <div className="mb-4 grid grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="number"
                name="avg_price_min"
                placeholder="Min Avg Price"
                value={filters.avg_price_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="avg_price_max"
                placeholder="Max Avg Price"
                value={filters.avg_price_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
                min="0"
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
                min="0"
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
                Results of the Aggregate function query
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
