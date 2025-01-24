
// // 'use client';

// // import { useState } from 'react';
// // import { api, QueryResult } from '../../../utils/api';
// // import { Code2, Database, PlayCircle, AlertTriangle } from 'lucide-react';

// // export default function QueryExecutionPage() {
// //   const [query, setQuery] = useState('');
// //   const [results, setResults] = useState<any[] | null>(null);
// //   const [error, setError] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleExecuteQuery = async () => {
// //     setIsLoading(true);
// //     setError(null);
// //     try {
        
//     //   const response: QueryResult = await api.executeRawQuery(`SELECT * from bill_detail
//     //     where pay_status = 'paid';`);
// //       if (response.success) {
// //         setResults(response.data);
// //       } else {
// //         setError(response.error || 'Query execution failed');
// //       }
// //     } catch (err: any) {
// //       setError(err.message || 'An error occurred while executing the query');
// //       setResults(null);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-8">
// //       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        

// //         {/* Query Input Section */}
// //         <div className="p-6">

// //           {/* Results Display */}
// //           {results && (
// //             <div className="mt-6 bg-gray-100 rounded-lg p-4">
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
// //                   <thead className="bg-gray-200">
// //                     <tr>
// //                       {results.length > 0 &&
// //                         Object.keys(results[0]).map((header) => (
// //                           <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                             {header}
// //                           </th>
// //                         ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {results.map((row, i) => (
// //                       <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
// //                         {Object.values(row).map((value: any, j) => (
// //                           <td key={j} className="px-4 py-3 text-sm">
// //                             {typeof value === 'object' ? JSON.stringify(value) : String(value)}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //               <p className="mt-4 text-sm text-gray-500 text-right">
// //                 Total rows: {results.length}
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }










// 'use client';

// import { useEffect, useState } from 'react';
// import { api, QueryResult } from '../../../utils/api';
// import { Code2, Database, PlayCircle, AlertTriangle } from 'lucide-react';

// export default function QueryExecutionPage() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<any[] | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const handleExecuteQuery = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//         const response: QueryResult = await api.executeRawQuery(`SELECT * from bill_detail
//             where pay_status = 'paid';`);
//         if (response.success) {
//             setResults(response.data);
//         } else {
//             setError(response.error || 'Query execution failed');
//         }
//         } catch (err: any) {
//         setError(err.message || 'An error occurred while executing the query');
//         setResults(null);
//         } finally {
//         setIsLoading(false);
//         }
//     };

//     handleExecuteQuery();

//   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-8">
// //       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
// //         <div className="p-6">
// //           {error && (
// //             <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
// //               <AlertTriangle className="mr-3 text-red-500" size={24} />
// //               <span>{error}</span>
// //             </div>
// //           )}

// //           {/* Results Display */}
// //           {results && (
// //             <div className="mt-6 bg-gray-100 rounded-lg p-4">
// //               <h2 className="text-xl font-semibold mb-4 flex items-center">
// //                 {/* <Database className="mr-2 text-blue-500" size={20} /> */}
// //                 Payment done
// //               </h2>
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
// //                   <thead className="bg-gray-200">
// //                     <tr>
// //                       {results.length > 0 &&
// //                         Object.keys(results[0]).map((header) => (
// //                           <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                             {header}
// //                           </th>
// //                         ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {results.map((row, i) => (
// //                       <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
// //                         {Object.values(row).map((value: any, j) => (
// //                           <td key={j} className="px-4 py-3 text-sm">
// //                             {typeof value === 'object' ? JSON.stringify(value) : String(value)}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //               <p className="mt-4 text-sm text-gray-500 text-right">
// //                 Total rows: {results.length}
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );



// return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="w-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
//         <div className="p-6">
//           {error && (
//             <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
//               <AlertTriangle className="mr-3 text-red-500" size={24} />
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Results Display */}
//           {results && (
//             <div className="mt-6 bg-gray-100 rounded-lg p-4">
//               <h2 className="text-xl font-semibold mb-4 flex items-center">
//                 Payment done
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       {results.length > 0 &&
//                         Object.keys(results[0]).map((header) => (
//                           <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {header}
//                           </th>
//                         ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {results.map((row, i) => (
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
//                 Total rows: {results.length}
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
import { Code2, Database, PlayCircle, AlertTriangle, Filter, Search } from 'lucide-react';

export default function QueryExecutionPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtering states
  const [nameFilter, setNameFilter] = useState('');
  const [minAmountFilter, setMinAmountFilter] = useState('');
  const [maxAmountFilter, setMaxAmountFilter] = useState('');

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`SELECT * from bill_detail where pay_status = 'paid';`);
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
      // Name filter
      const nameMatch = nameFilter 
        ? String(row.user_name).toLowerCase().includes(nameFilter.toLowerCase()) 
        : true;

      // Amount filter
      const amountValue = parseFloat(row.amount);
      const minMatch = minAmountFilter 
        ? amountValue >= parseFloat(minAmountFilter) 
        : true;
      const maxMatch = maxAmountFilter 
        ? amountValue <= parseFloat(maxAmountFilter) 
        : true;

      return nameMatch && minMatch && maxMatch;
    });

    setFilteredResults(filtered);
  }, [nameFilter, minAmountFilter, maxAmountFilter, results]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="p-6">
          {/* Filters */}
          <div className="mb-4 flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            {/* <div className="flex-1 relative">
              <input
                type="number"
                placeholder="Min Amount"
                value={minAmountFilter}
                onChange={(e) => setMinAmountFilter(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="flex-1 relative">
              <input
                type="number"
                placeholder="Max Amount"
                value={maxAmountFilter}
                onChange={(e) => setMaxAmountFilter(e.target.value)}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div> */}
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
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                Payment done
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