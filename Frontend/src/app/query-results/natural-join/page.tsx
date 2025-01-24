// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import { Card, Table, Title, Text } from "@tremor/react";
// // // import { api } from "../../../utils/api";
// // // import ProtectedRoute from "../../components/protected-route";

// // // interface QueryResult {
// // //   order_id: number;
// // //   prod_id: number;
// // //   prod_name: string;
// // //   prod_qty: number;
// // //   prod_price: number;
// // //   prod_total_price: number;
// // // }

// // // export default function QueryResultsPage() {
// // //   const [queryResults, setQueryResults] = useState<QueryResult[]>([]);

// // // //   useEffect(() => {
// // // //     const fetchQueryResults = async () => {
// // // //       try {
// // // //         const results = await api.get('/natural-join');
// // // //         console.log("Query results:", results);
// // // //         setQueryResults(results);
// // // //       } catch (error) {
// // // //         console.error("Error fetching query results:", error);
// // // //       }
// // // //     };

// // // //     fetchQueryResults();
// // // //   }, []);

// // //     useEffect(() => {
// // //         const fetchQueryResults = async () => {
// // //         try {
// // //             console.log("Fetching query results...");
// // //             const results = await api.get('/natural-join');
// // //             console.log("Raw results:", results);
// // //             setQueryResults(results);
// // //         } catch (error) {
// // //             console.error("Error fetching query results:", error);
// // //         }
// // //         };
    
// // //         fetchQueryResults();
// // //     }, []);
  

// // //   return (
// // //     <ProtectedRoute>
// // //       <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
// // //         <Title className="text-2xl font-semibold">Query Results</Title>
// // //         <Text className="mt-2 text-gray-600">Results of the natural join query</Text>
// // //         <Card className="mt-6 shadow-lg">
// // //           <Table className="mt-6 border-t border-gray-200">
// // //             <thead className="bg-gray-100">
// // //               <tr>
// // //                 <th className="px-4 py-2 text-left">Order ID</th>
// // //                 <th className="px-4 py-2 text-left">Product ID</th>
// // //                 <th className="px-4 py-2 text-left">Product Name</th>
// // //                 <th className="px-4 py-2 text-left">Quantity</th>
// // //                 <th className="px-4 py-2 text-left">Price</th>
// // //                 <th className="px-4 py-2 text-left">Total Price</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {queryResults.map((result, index) => (
// // //                 <tr key={index} className="hover:bg-gray-50">
// // //                   <td className="px-4 py-2">{result.order_id}</td>
// // //                   <td className="px-4 py-2">{result.prod_id}</td>
// // //                   <td className="px-4 py-2">{result.prod_name}</td>
// // //                   <td className="px-4 py-2">{result.prod_qty}</td>
// // //                   <td className="px-4 py-2">{result.prod_price}</td>
// // //                   <td className="px-4 py-2">{result.prod_total_price}</td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </Table>
// // //         </Card>
// // //       </main>
// // //     </ProtectedRoute>
// // //   );
// // // }




// // "use client";
// // import { useEffect, useState } from "react";
// // import { Card, Table, Title, Text } from "@tremor/react";
// // import { api } from "../../../utils/api";
// // import ProtectedRoute from "../../components/protected-route";

// // interface QueryResult {
// //   order_id: number;
// //   prod_id: number;
// //   prod_name: string;
// //   prod_qty: number;
// //   prod_price: number;
// //   prod_total_price: number;
// // }

// // export default function QueryResultsPage() {
// //   const [queryResults, setQueryResults] = useState<QueryResult[]>([]);

// // //   useEffect(() => {
// // //     const fetchQueryResults = async () => {
// // //       try {
// // //         console.log("Fetching query results...");
// // //         const results = await api.get('/natural-join');
// // //         console.log("Raw results:", results);
// // //         setQueryResults(Array.isArray(results) ? results : []); // Handle non-array responses
// // //       } catch (error) {
// // //         console.error("Error fetching query results:", error);
// // //       }
// // //     };

// // //     fetchQueryResults();
// // //   }, []);

// // useEffect(() => {
// //     const fetchQueryResults = async () => {
// //       try {
// //         console.log("Fetching query results...");
// //         const response = await api.get('/natural-join');
// //         // console.log("Raw results:", response);
  
// //         // Extract rows if they exist
// //         const rows = response?.results?.rows || [];
// //         // console.log("number of results", rows.length);
// //         setQueryResults(rows);
// //       } catch (error) {
// //         console.error("Error fetching query results:", error);
// //       }
// //     };

    
  
// //     fetchQueryResults();
// //   }, []);
  

// //   return (
// //     <ProtectedRoute>
// //       <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
// //         <Title className="text-2xl font-semibold">Query Results</Title>
// //         <Text className="mt-2 text-gray-600">Results of the natural join query</Text>
// //         <Card className="mt-6 shadow-lg">
// //           <Table className="mt-6 border-t border-gray-200">
// //             <thead className="bg-gray-100">
// //               <tr>
// //                 <th className="px-4 py-2 text-left">Order ID</th>
// //                 <th className="px-4 py-2 text-left">Product ID</th>
// //                 <th className="px-4 py-2 text-left">Product Name</th>
// //                 <th className="px-4 py-2 text-left">Quantity</th>
// //                 <th className="px-4 py-2 text-left">Price</th>
// //                 <th className="px-4 py-2 text-left">Total Price</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {queryResults.map((result, index) => (
// //                 <tr key={index} className="hover:bg-gray-50">
// //                   <td className="px-4 py-2">{result.order_id}</td>
// //                   <td className="px-4 py-2">{result.prod_id}</td>
// //                   <td className="px-4 py-2">{result.prod_name}</td>
// //                   <td className="px-4 py-2">{result.prod_qty}</td>
// //                   <td className="px-4 py-2">{result.prod_price}</td>
// //                   <td className="px-4 py-2">{result.prod_total_price}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </Card>
// //       </main>
// //     </ProtectedRoute>
// //   );
// // }




// 'use client';

// import { useEffect, useState } from 'react';
// import { api, QueryResult } from '../../../utils/api';
// import { Code2, Database, PlayCircle, AlertTriangle, Filter, Search } from 'lucide-react';

// export default function QueryExecutionPage() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<any[] | null>(null);
//   const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Filtering states
//   const [nameFilter, setNameFilter] = useState('');
//   const [minAmountFilter, setMinAmountFilter] = useState('');
//   const [maxAmountFilter, setMaxAmountFilter] = useState('');

//   useEffect(() => {
//     const handleExecuteQuery = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response: QueryResult = await api.executeRawQuery(`
//       SELECT * 
//       FROM order_detail NATURAL JOIN product;
//     `);
//         if (response.success) {
//           setResults(response.data);
//           setFilteredResults(response.data);
//         } else {
//           setError(response.error || 'Query execution failed');
//         }
//       } catch (err: any) {
//         setError(err.message || 'An error occurred while executing the query');
//         setResults(null);
//         setFilteredResults(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     handleExecuteQuery();
//   }, []);

//   // Apply filters
//   useEffect(() => {
//     if (!results) return;

//     const filtered = results.filter(row => {
//       // Name filter
//       const nameMatch = nameFilter 
//         ? String(row.prod_name).toLowerCase().includes(nameFilter.toLowerCase()) 
//         : true;

//       // Amount filter
//       const amountValue = parseFloat(row.amount);
//       const minMatch = minAmountFilter 
//         ? amountValue >= parseFloat(minAmountFilter) 
//         : true;
//       const maxMatch = maxAmountFilter 
//         ? amountValue <= parseFloat(maxAmountFilter) 
//         : true;

//       return nameMatch && minMatch && maxMatch;
//     });

//     setFilteredResults(filtered);
//   }, [nameFilter, minAmountFilter, maxAmountFilter, results]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="w-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
//         <div className="p-6">
//           {/* Filters */}
//           <div className="mb-4 flex space-x-4">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 placeholder="Search by Name"
//                 value={nameFilter}
//                 onChange={(e) => setNameFilter(e.target.value)}
//                 className="w-full p-2 pl-8 border rounded-lg"
//               />
//               <Search className="absolute left-2 top-3 text-gray-400" size={18} />
//             </div>
//           </div>

//           {error && (
//             <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
//               <AlertTriangle className="mr-3 text-red-500" size={24} />
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Results Display */}
//           {filteredResults && (
//             <div className="mt-6 bg-gray-100 rounded-lg p-4">
//               <h2 className="text-xl font-semibold mb-4 flex items-center">
//                 Results of the natural join query
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       {filteredResults.length > 0 &&
//                         Object.keys(filteredResults[0]).map((header) => (
//                           <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {header}
//                           </th>
//                         ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredResults.map((row, i) => (
//                       <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
//                         {Object.values(row).map((value: any, j) => (
//                           <td key={j} className="px-4 py-3 text-sm">
//                             {typeof value === 'object' ? JSON.stringify(value) : String(value)}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <p className="mt-4 text-sm text-gray-500 text-right">
//                 Total rows: {filteredResults.length}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
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
    prod_name: '',
    min_price: '',
    max_price: '',
    min_qty: '',
    max_qty: '',
    rating_stars: ''
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
          SELECT * FROM order_detail NATURAL JOIN product;
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
      const nameMatch = filters.prod_name 
        ? String(row.prod_name).toLowerCase().includes(filters.prod_name.toLowerCase()) 
        : true;

      const priceMatch = 
        (!filters.min_price || parseFloat(row.prod_price) >= parseFloat(filters.min_price)) &&
        (!filters.max_price || parseFloat(row.prod_price) <= parseFloat(filters.max_price));

      const qtyMatch = 
        (!filters.min_qty || parseFloat(row.prod_quantity) >= parseFloat(filters.min_qty)) &&
        (!filters.max_qty || parseFloat(row.prod_quantity) <= parseFloat(filters.max_qty));

      const ratingMatch = filters.rating_stars 
        ? row.rating_stars >= parseFloat(filters.rating_stars)
        : true;

      return nameMatch && priceMatch && qtyMatch && ratingMatch;
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
                name="min_price"
                placeholder="Min Price"
                value={filters.min_price}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
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
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
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
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
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
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
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
                Results of the natural join query
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