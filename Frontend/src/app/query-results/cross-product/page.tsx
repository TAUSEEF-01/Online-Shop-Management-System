// "use client";
// import { useEffect, useState } from "react";
// import { Card, Table, Title, Text } from "@tremor/react";
// import { api } from "../../../utils/api";
// import ProtectedRoute from "../../components/protected-route";

// interface CrossProductResult {
//   user_id: number;
//   user_name: string;
//   user_email: string;
//   order_id: number;
//   order_date: string;
//   order_status: string;
// }

// export default function CrossProductResultsPage() {
//   const [crossProductResults, setCrossProductResults] = useState<CrossProductResult[]>([]);

//   useEffect(() => {
//     const fetchCrossProductResults = async () => {
//       try {
//         console.log("Fetching cross-product results...");
//         const response = await api.get('/cross-product');
//         const rows = response?.results || [];
//         setCrossProductResults(rows);
//       } catch (error) {
//         console.error("Error fetching cross-product results:", error);
//       }
//     };

//     fetchCrossProductResults();
//   }, []);

//   return (
//     <ProtectedRoute>
//       <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
//         <Title className="text-2xl font-semibold">Cross Product Results</Title>
//         <Text className="mt-2 text-gray-600">Results of the cross product query</Text>
//         <Card className="mt-6 shadow-lg">
//           <Table className="mt-6 border-t border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">User ID</th>
//                 <th className="px-4 py-2 text-left">User Name</th>
//                 <th className="px-4 py-2 text-left">User Email</th>
//                 <th className="px-4 py-2 text-left">Order ID</th>
//                 <th className="px-4 py-2 text-left">Order Date</th>
//                 <th className="px-4 py-2 text-left">Order Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {crossProductResults.map((result, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2">{result.user_id}</td>
//                   <td className="px-4 py-2">{result.user_name}</td>
//                   <td className="px-4 py-2">{result.user_email}</td>
//                   <td className="px-4 py-2">{result.order_id}</td>
//                   <td className="px-4 py-2">{result.order_date}</td>
//                   <td className="px-4 py-2">{result.order_status}</td>
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

  // Update filtering states
  const [filters, setFilters] = useState({
    order_id: '',
    order_date: '',
    user_id: '',
    user_address: '',
    total_amt_min: '',
    total_amt_max: '',
    order_status: '',
    user_name: ''
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: QueryResult = await api.executeRawQuery(`
      SELECT * 
      FROM users, orders;
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

  // Update filter logic
  useEffect(() => {
    if (!results) return;

    const filtered = results.filter(row => {
      const orderIdMatch = filters.order_id
        ? String(row.order_id).includes(filters.order_id)
        : true;

      const orderDateMatch = filters.order_date
        ? String(row.order_date).includes(filters.order_date)
        : true;

      const userIdMatch = filters.user_id
        ? String(row.user_id).includes(filters.user_id)
        : true;

      const userAddressMatch = filters.user_address
        ? String(row.user_address).toLowerCase().includes(filters.user_address.toLowerCase())
        : true;

      const totalAmtMatch = 
        (!filters.total_amt_min || parseFloat(row.total_amt) >= parseFloat(filters.total_amt_min)) &&
        (!filters.total_amt_max || parseFloat(row.total_amt) <= parseFloat(filters.total_amt_max));

      const statusMatch = filters.order_status
        ? String(row.order_status).toLowerCase().includes(filters.order_status.toLowerCase())
        : true;

      const userNameMatch = filters.user_name
        ? String(row.user_name).toLowerCase().includes(filters.user_name.toLowerCase())
        : true;

      return orderIdMatch && orderDateMatch && userIdMatch && userAddressMatch && 
             totalAmtMatch && statusMatch && userNameMatch;
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
          {/* Update filter inputs */}
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
                name="order_date"
                placeholder="Search Order Date"
                value={filters.order_date}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
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
                type="text"
                name="user_address"
                placeholder="Search User Address"
                value={filters.user_address}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="total_amt_min"
                placeholder="Min Total Amount"
                value={filters.total_amt_min}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="number"
                name="total_amt_max"
                placeholder="Max Total Amount"
                value={filters.total_amt_max}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Filter className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="text"
                name="order_status"
                placeholder="Search Status"
                value={filters.order_status}
                onChange={handleFilterChange}
                className="w-full p-2 pl-8 border rounded-lg"
              />
              <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            </div>
            <div className="relative">
              <input
                type="text"
                name="user_name"
                placeholder="Search User Name"
                value={filters.user_name}
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
                Results of the cross product query
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