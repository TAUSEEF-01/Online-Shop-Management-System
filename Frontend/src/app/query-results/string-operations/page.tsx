// "use client";
// import { useEffect, useState } from "react";
// import { Card, Table, Title, Text } from "@tremor/react";
// import { api } from "../../../utils/api";
// import ProtectedRoute from "../../components/protected-route";

// interface StringOperationsResult {
//   prod_name: string;
//   lower_name: string;
//   upper_name: string;
// }

// export default function StringOperationsResultsPage() {
//   const [stringOperationsResults, setStringOperationsResults] = useState<StringOperationsResult[]>([]);

//   useEffect(() => {
//     const fetchStringOperationsResults = async () => {
//       try {
//         console.log("Fetching string operations results...");
//         const response = await api.get('/string-operations');
//         const rows = response?.results || [];
//         setStringOperationsResults(rows);
//       } catch (error) {
//         console.error("Error fetching string operations results:", error);
//       }
//     };

//     fetchStringOperationsResults();
//   }, []);

//   return (
//     <ProtectedRoute>
//       <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
//         <Title className="text-2xl font-semibold">String Operations Results</Title>
//         <Text className="mt-2 text-gray-600">Results of the string operations query</Text>
//         <Card className="mt-6 shadow-lg">
//           <Table className="mt-6 border-t border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Product Name</th>
//                 <th className="px-4 py-2 text-left">Lowercase Name</th>
//                 <th className="px-4 py-2 text-left">Uppercase Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stringOperationsResults.map((result, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2">{result.prod_name}</td>
//                   <td className="px-4 py-2">{result.lower_name}</td>
//                   <td className="px-4 py-2">{result.upper_name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card>
//       </main>
//     </ProtectedRoute>
//   );
// }





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



"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, Search, AlertTriangle } from "lucide-react";

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
        ? String(row.prod_name).toLowerCase().includes(filters.prod_name.toLowerCase())
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
                type="text"
                name="lower_name"
                placeholder="Search Lowercase Name"
                value={filters.lower_name}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
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
              <h2 className="text-xl font-semibold mb-4">String Operations Results</h2>
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
          )}

          {isLoading && <p className="mt-4 text-gray-500">Loading results...</p>}
        </div>
      </div>
    </div>
  );
}
