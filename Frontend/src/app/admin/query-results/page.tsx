// "use client";
// import { useEffect, useState } from "react";
// import { Card, Table, Title, Text } from "@tremor/react";
// import { api } from "../../../utils/api";
// import ProtectedRoute from "../../components/protected-route";

// interface QueryResult {
//   order_id: number;
//   prod_id: number;
//   prod_name: string;
//   prod_qty: number;
//   prod_price: number;
//   prod_total_price: number;
// }

// export default function QueryResultsPage() {
//   const [queryResults, setQueryResults] = useState<QueryResult[]>([]);

// //   useEffect(() => {
// //     const fetchQueryResults = async () => {
// //       try {
// //         const results = await api.get('/natural-join');
// //         console.log("Query results:", results);
// //         setQueryResults(results);
// //       } catch (error) {
// //         console.error("Error fetching query results:", error);
// //       }
// //     };

// //     fetchQueryResults();
// //   }, []);

//     useEffect(() => {
//         const fetchQueryResults = async () => {
//         try {
//             console.log("Fetching query results...");
//             const results = await api.get('/natural-join');
//             console.log("Raw results:", results);
//             setQueryResults(results);
//         } catch (error) {
//             console.error("Error fetching query results:", error);
//         }
//         };
    
//         fetchQueryResults();
//     }, []);
  

//   return (
//     <ProtectedRoute>
//       <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
//         <Title className="text-2xl font-semibold">Query Results</Title>
//         <Text className="mt-2 text-gray-600">Results of the natural join query</Text>
//         <Card className="mt-6 shadow-lg">
//           <Table className="mt-6 border-t border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Order ID</th>
//                 <th className="px-4 py-2 text-left">Product ID</th>
//                 <th className="px-4 py-2 text-left">Product Name</th>
//                 <th className="px-4 py-2 text-left">Quantity</th>
//                 <th className="px-4 py-2 text-left">Price</th>
//                 <th className="px-4 py-2 text-left">Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {queryResults.map((result, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2">{result.order_id}</td>
//                   <td className="px-4 py-2">{result.prod_id}</td>
//                   <td className="px-4 py-2">{result.prod_name}</td>
//                   <td className="px-4 py-2">{result.prod_qty}</td>
//                   <td className="px-4 py-2">{result.prod_price}</td>
//                   <td className="px-4 py-2">{result.prod_total_price}</td>
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
import { Card, Table, Title, Text } from "@tremor/react";
import { api } from "../../../utils/api";
import ProtectedRoute from "../../components/protected-route";

interface QueryResult {
  order_id: number;
  prod_id: number;
  prod_name: string;
  prod_qty: number;
  prod_price: number;
  prod_total_price: number;
}

export default function QueryResultsPage() {
  const [queryResults, setQueryResults] = useState<QueryResult[]>([]);

//   useEffect(() => {
//     const fetchQueryResults = async () => {
//       try {
//         console.log("Fetching query results...");
//         const results = await api.get('/natural-join');
//         console.log("Raw results:", results);
//         setQueryResults(Array.isArray(results) ? results : []); // Handle non-array responses
//       } catch (error) {
//         console.error("Error fetching query results:", error);
//       }
//     };

//     fetchQueryResults();
//   }, []);

useEffect(() => {
    const fetchQueryResults = async () => {
      try {
        console.log("Fetching query results...");
        const response = await api.get('/natural-join');
        // console.log("Raw results:", response);
  
        // Extract rows if they exist
        const rows = response?.results?.rows || [];
        // console.log("number of results", rows.length);
        setQueryResults(rows);
      } catch (error) {
        console.error("Error fetching query results:", error);
      }
    };

    
  
    fetchQueryResults();
  }, []);
  

  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
        <Title className="text-2xl font-semibold">Query Results</Title>
        <Text className="mt-2 text-gray-600">Results of the natural join query</Text>
        <Card className="mt-6 shadow-lg">
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Product ID</th>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {queryResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{result.order_id}</td>
                  <td className="px-4 py-2">{result.prod_id}</td>
                  <td className="px-4 py-2">{result.prod_name}</td>
                  <td className="px-4 py-2">{result.prod_qty}</td>
                  <td className="px-4 py-2">{result.prod_price}</td>
                  <td className="px-4 py-2">{result.prod_total_price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
