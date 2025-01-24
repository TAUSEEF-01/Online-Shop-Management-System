// 'use client';

// import { api, QueryResult } from '../../../utils/api';

// import { useState } from 'react';

// export default function QueryExecutionPage() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<any[] | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleExecuteQuery = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response: QueryResult = await api.executeRawQuery(query);
//       if (response.success) {
//         setResults(response.data);
//       } else {
//         setError(response.error || 'Query execution failed');
//       }
//     } catch (err: any) {
//       setError(err.message || 'An error occurred while executing the query');
//       setResults(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">SQL Query Execution</h1>
      
//       {/* Query Input */}
//       <div className="mb-4">
//         <textarea
//           className="w-full p-4 border border-gray-300 rounded-md shadow-sm min-h-[200px]"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter your SQL query here..."
//         />
//       </div>
      
//       {/* Execute Button */}
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
//         onClick={handleExecuteQuery}
//         disabled={isLoading || !query.trim()}
//       >
//         {isLoading ? 'Executing...' : 'Execute Query'}
//       </button>

//       {/* Error Display */}
//       {error && (
//         <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Results Display */}
//       {results && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Results</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead>
//                 <tr>
//                   {results.length > 0 &&
//                     Object.keys(results[0]).map((header) => (
//                       <th key={header} className="border-b p-2 bg-gray-100">
//                         {header}
//                       </th>
//                     ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((row, i) => (
//                   <tr key={i}>
//                     {Object.values(row).map((value: any, j) => (
//                       <td key={j} className="border-b p-2">
//                         {typeof value === 'object' ? JSON.stringify(value) : String(value)}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <p className="mt-2 text-gray-600">
//             Total rows: {results.length}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }




'use client';

import { useState } from 'react';
import { api, QueryResult } from '../../../utils/api';
import { Code2, Database, PlayCircle, AlertTriangle } from 'lucide-react';

export default function QueryExecutionPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExecuteQuery = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: QueryResult = await api.executeRawQuery(query);
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.error || 'Query execution failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while executing the query');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex items-center">
          <Code2 className="text-white mr-4" size={36} />
          <h1 className="text-3xl font-bold text-white">SQL Query Executor</h1>
        </div>

        {/* Query Input Section */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <Database className="mr-2 text-blue-500" size={20} />
              SQL Query
            </label>
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition-all duration-300 min-h-[200px] font-mono text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your SQL query here..."
            />
          </div>
          
          {/* Execute Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            onClick={handleExecuteQuery}
            disabled={isLoading || !query.trim()}
          >
            <PlayCircle className="mr-2" size={20} />
            {isLoading ? 'Executing...' : 'Execute Query'}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="mr-3 text-red-500" size={24} />
              <span>{error}</span>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Database className="mr-2 text-blue-500" size={20} />
                Query Results
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      {results.length > 0 &&
                        Object.keys(results[0]).map((header) => (
                          <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
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
                Total rows: {results.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}