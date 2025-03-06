// "use client";

// import { useEffect, useState } from "react";
// import {
//   Card,
//   Grid,
//   Table,
//   Title,
//   Text,
//   BarChart,
//   Flex,
//   Metric,
//   Badge,
// } from "@tremor/react";
// import Link from "next/link";
// import ProtectedRoute from "../components/protected-route";
// import AdminLayout from "../components/admin-layout";
// import { api } from "@/utils/api";

// interface SaleData {
//   date: string;
//   amount: number;
//   items: number;
// }

// const dataFormatter = (number: number) =>
//   "$" + Intl.NumberFormat("us").format(number);

// export default function AdminDashboard() {
//   const [totalProducts, setTotalProducts] = useState<number>(0);
//   const [totalSales, setTotalSales] = useState<number>(0);
//   const [salesData, setSalesData] = useState<SaleData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         const [productsResponse, salesResponse, dailySalesResponse] =
//           await Promise.all([
//             api.getTotalProducts(),
//             api.getTotalPaidAmount(),
//             api.getDailySales(),
//           ]);

//         if (productsResponse.status === "success") {
//           setTotalProducts(productsResponse.data.total);
//         }

//         if (salesResponse.status === "success") {
//           setTotalSales(salesResponse.data.total);
//         }

//         if (dailySalesResponse.status === "success") {
//           // Make sure the data is in the correct format for the chart
//           const formattedSalesData = dailySalesResponse.data
//             .map((item) => ({
//               date: item.date,
//               amount: Number(item.amount),
//               items: Number(item.items),
//             }))
//             .sort(
//               (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//             );

//           console.log("Formatted sales data:", formattedSalesData); // Debug log
//           setSalesData(formattedSalesData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <ProtectedRoute>
//       <AdminLayout>
//         <main className="p-6 md:p-12 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-lg">
//           {/* Header */}
//           <Flex justifyContent="between" className="items-center">
//             <div className="space-x-4 mb-4">
//               <div className="flex flex-wrap gap-4">
//                 {/* Main Action Buttons */}
//                 <div className="flex gap-4 w-full mb-4">
//                   <Link href="/add-product">
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all hover:shadow-lg">
//                       Add Product
//                     </button>
//                   </Link>

//                   <Link href="/update-product-info">
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all hover:shadow-lg">
//                       Update Product Information
//                     </button>
//                   </Link>

//                   <Link href="/users">
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all hover:shadow-lg">
//                       Show All Users
//                     </button>
//                   </Link>
//                 </div>

//                 {/* Query Buttons Grid */}
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                   <Link href="/query-results/natural-join">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Natural Join
//                     </button>
//                   </Link>
//                   <Link href="/query-results/cross-product">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Cross Product
//                     </button>
//                   </Link>
//                   <Link href="/query-results/outer-join">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Outer Join
//                     </button>
//                   </Link>
//                   <Link href="/query-results/join-using">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Join Using
//                     </button>
//                   </Link>
//                   <Link href="/query-results/join-on">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Join On
//                     </button>
//                   </Link>
//                   <Link href="/query-results/nested-any">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Nested Any
//                     </button>
//                   </Link>
//                   <Link href="/query-results/nested-from">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Nested From
//                     </button>
//                   </Link>
//                   <Link href="/query-results/order-by">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Order By
//                     </button>
//                   </Link>
//                   <Link href="/query-results/group-by">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Group By
//                     </button>
//                   </Link>
//                   <Link href="/query-results/having">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Having
//                     </button>
//                   </Link>
//                   <Link href="/query-results/with-clause">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       With Clause
//                     </button>
//                   </Link>
//                   <Link href="/query-results/string-operations">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       String Operations
//                     </button>
//                   </Link>
//                   <Link href="/query-results/aggregate-functions">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Aggregate Functions
//                     </button>
//                   </Link>
//                   <Link href="/query-results/payment-done">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Payment Done
//                     </button>
//                   </Link>
//                   <Link href="/query-results/any-query">
//                     <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
//                       Any Query
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </Flex>
//           <Text className="mt-2 text-gray-600">
//             Overview of your store's performance
//           </Text>

//           {/* Summary Cards */}
//           <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
//             <Card decoration="top" decorationColor="blue" className="shadow-lg">
//               <Flex justifyContent="start" className="space-x-4">
//                 <div>
//                   <Text className="text-gray-500">Total Products</Text>
//                   <Metric className="text-blue-600">{totalProducts}</Metric>
//                 </div>
//               </Flex>
//             </Card>
//             <Card
//               decoration="top"
//               decorationColor="green"
//               className="shadow-lg"
//             >
//               <Flex justifyContent="start" className="space-x-4">
//                 <div>
//                   <Text className="text-gray-500">Total Sales</Text>
//                   <Metric className="text-green-600">
//                     ${totalSales.toFixed(2)}
//                   </Metric>
//                 </div>
//               </Flex>
//             </Card>
//           </Grid>

//           {/* Bar Chart */}
//           <Card className="mt-8 shadow-lg">
//             <Title className="text-lg font-semibold text-indigo-700">
//               Sales Overview
//             </Title>
//             <Text className="text-gray-600">Daily sales performance</Text>
//             {isLoading ? (
//               <div className="h-[400px] flex items-center justify-center">
//                 <p>Loading chart data...</p>
//               </div>
//             ) : salesData.length > 0 ? (
//               <BarChart
//                 className="mt-6 h-[400px]"
//                 data={salesData}
//                 index="date"
//                 categories={["amount"]}
//                 colors={["cyan"]}
//                 valueFormatter={dataFormatter}
//                 yAxisWidth={60}
//                 showLegend
//                 showAnimation
//               />
//             ) : (
//               <div className="h-[400px] flex items-center justify-center">
//                 <p>No sales data available</p>
//               </div>
//             )}
//           </Card>

//           {/* Sales Details Table */}
//           <Card className="mt-8 shadow-lg">
//             <Title className="text-lg font-semibold text-indigo-700">
//               Sales Details
//             </Title>
//             <Table className="mt-6 border-t border-gray-200">
//               <thead className="bg-indigo-100">
//                 <tr>
//                   <th className="px-4 py-2 text-left">Date</th>
//                   <th className="px-4 py-2 text-left">Items Sold</th>
//                   <th className="px-4 py-2 text-right">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {isLoading ? (
//                   <tr>
//                     <td colSpan={3} className="text-center py-4">
//                       Loading sales data...
//                     </td>
//                   </tr>
//                 ) : salesData.length === 0 ? (
//                   <tr>
//                     <td colSpan={3} className="text-center py-4">
//                       No sales data available
//                     </td>
//                   </tr>
//                 ) : (
//                   salesData.map((sale, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-4 py-2">{sale.date}</td>
//                       <td className="px-4 py-2">
//                         <Badge className="text-indigo-600 ">{sale.items}</Badge>
//                       </td>
//                       <td className="px-4 py-2 text-right font-medium">
//                         ${sale.amount.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </Card>
//         </main>
//       </AdminLayout>
//     </ProtectedRoute>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Table,
  Title,
  Text,
  BarChart,
  Flex,
  Metric,
  Badge,
} from "@tremor/react";
import Link from "next/link";
import ProtectedRoute from "../components/protected-route";
import AdminLayout from "../components/admin-layout";
import { api } from "@/utils/api";

interface SaleData {
  date: string;
  amount: number;
  items: number;
}

const dataFormatter = (number: number) =>
  "$" + Intl.NumberFormat("us").format(number);

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [salesData, setSalesData] = useState<SaleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [productsResponse, salesResponse, dailySalesResponse] =
          await Promise.all([
            api.getTotalProducts(),
            api.getTotalPaidAmount(),
            api.getDailySales(),
          ]);

        if (productsResponse.status === "success") {
          setTotalProducts(productsResponse.data.total);
        }

        if (salesResponse.status === "success") {
          setTotalSales(salesResponse.data.total);
        }

        if (dailySalesResponse.status === "success") {
          // Make sure the data is in the correct format for the chart
          const formattedSalesData = dailySalesResponse.data
            .map((item) => ({
              date: item.date,
              amount: Number(item.amount),
              items: Number(item.items),
            }))
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );

          console.log("Formatted sales data:", formattedSalesData); // Debug log
          setSalesData(formattedSalesData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <main className="p-6 md:p-12 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-lg">
          {/* Header */}
          <Flex justifyContent="between" className="items-center">
            <div className="space-x-4 mb-4">
              <div className="flex flex-wrap gap-4">
                {/* Main Action Buttons */}
                <div className="flex gap-4 w-full mb-4">
                  <Link href="/add-product">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all hover:shadow-lg">
                      Add Product
                    </button>
                  </Link>

                  <Link href="/update-product-info">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all hover:shadow-lg">
                      Update Product Information
                    </button>
                  </Link>

                  <Link href="/users">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all hover:shadow-lg">
                      Show All Users
                    </button>
                  </Link>
                </div>

                {/* Query Buttons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/query-results/natural-join">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Natural Join
                    </button>
                  </Link>
                  <Link href="/query-results/cross-product">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Cross Product
                    </button>
                  </Link>
                  <Link href="/query-results/outer-join">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Outer Join
                    </button>
                  </Link>
                  <Link href="/query-results/join-using">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Join Using
                    </button>
                  </Link>
                  <Link href="/query-results/join-on">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Join On
                    </button>
                  </Link>
                  <Link href="/query-results/nested-any">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Nested Any
                    </button>
                  </Link>
                  <Link href="/query-results/nested-from">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Nested From
                    </button>
                  </Link>
                  <Link href="/query-results/order-by">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Order By
                    </button>
                  </Link>
                  <Link href="/query-results/group-by">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Group By
                    </button>
                  </Link>
                  <Link href="/query-results/having">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Having
                    </button>
                  </Link>
                  <Link href="/query-results/with-clause">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      With Clause
                    </button>
                  </Link>
                  <Link href="/query-results/string-operations">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      String Operations
                    </button>
                  </Link>
                  <Link href="/query-results/aggregate-functions">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Aggregate Functions
                    </button>
                  </Link>
                  <Link href="/query-results/payment-done">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Payment Done
                    </button>
                  </Link>
                  <Link href="/query-results/any-query">
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      Any Query
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Flex>
          <Text className="mt-2 text-gray-600">
            Overview of your store's performance
          </Text>

          {/* Summary Cards */}
          <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
            <Card decoration="top" decorationColor="blue" className="shadow-lg">
              <Flex justifyContent="start" className="space-x-4">
                <div>
                  <Text className="text-gray-500">Total Products</Text>
                  <Metric className="text-blue-600">{totalProducts}</Metric>
                </div>
              </Flex>
            </Card>
            <Card
              decoration="top"
              decorationColor="green"
              className="shadow-lg"
            >
              <Flex justifyContent="start" className="space-x-4">
                <div>
                  <Text className="text-gray-500">Total Sales</Text>
                  <Metric className="text-green-600">
                    ${totalSales.toFixed(2)}
                  </Metric>
                </div>
              </Flex>
            </Card>
          </Grid>

          {/* Bar Chart */}
          <Card className="mt-8 shadow-lg">
            <Title className="text-lg font-semibold text-indigo-700">
              Sales Overview
            </Title>
            <Text className="text-gray-600">Daily sales performance</Text>
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <p>Loading chart data...</p>
              </div>
            ) : salesData.length > 0 ? (
              <BarChart
                className="mt-6 h-[400px]"
                data={salesData}
                index="date"
                categories={["amount"]}
                colors={["cyan"]}
                valueFormatter={dataFormatter}
                yAxisWidth={60}
                showLegend
                showAnimation
              />
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p>No sales data available</p>
              </div>
            )}
          </Card>

          {/* Sales Details Table */}
          <Card className="mt-8 shadow-lg">
            <Title className="text-lg font-semibold text-indigo-700">
              Sales Details
            </Title>
            <Table className="mt-6 border-t border-gray-200">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Items Sold</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      Loading sales data...
                    </td>
                  </tr>
                ) : salesData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No sales data available
                    </td>
                  </tr>
                ) : (
                  salesData.map((sale, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2">{sale.date}</td>
                      <td className="px-4 py-2">
                        <Badge className="text-indigo-600 ">{sale.items}</Badge>
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        ${sale.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card>
        </main>
      </AdminLayout>
    </ProtectedRoute>
  );
}