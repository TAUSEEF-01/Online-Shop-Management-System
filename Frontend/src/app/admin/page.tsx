// "use client";
// import { Card, Grid, Table, Title, Text, BarChart, Flex, Metric, Badge } from "@tremor/react";
// import Link from 'next/link';
// import ProtectedRoute from "../components/protected-route";

// interface SaleData {
//   date: string;
//   amount: number;
//   items: number;
// }

// const dummySalesData = [
//     { date: "2024-01-01", amount: 1250.99, items: 15 },
//     { date: "2024-01-02", amount: 2100.5, items: 23 },
//     { date: "2024-01-03", amount: 1800.75, items: 18 },
//     { date: "2024-01-04", amount: 3200.25, items: 30 },
//     { date: "2024-01-05", amount: 1500.0, items: 12 },
//     { date: "2024-01-06", amount: 2800.5, items: 25 },
//     { date: "2024-01-07", amount: 3100.75, items: 28 },
//   ];
  

// const dummyTotalProducts = 150;
// const dummyTotalSales = dummySalesData.reduce((sum, sale) => sum + sale.amount, 0);

// const dataFormatter = (number: number) => "$" + Intl.NumberFormat("us").format(number);

// export default function AdminDashboard() {
//   return (
//     <ProtectedRoute>
//     <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
//       {/* Header */}
//       <Flex justifyContent="between" className="items-center">
//         <Flex justifyContent="start" className="space-x-3 items-center">
//           <Title className="text-2xl font-semibold">Admin Dashboard</Title>
//           <Badge size="xl" color="green">
//             Live
//           </Badge>
//         </Flex>
//         <div className="space-x-4">
//           <Link href="/add-product">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
//               Add Product
//             </button>
//           </Link>
//           <Link href="/admin/users">
//             <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
//               Show All Users
//             </button>
//           </Link>

          // {/* <Link href="/admin/query-results"> */}
          // <Link href="/query-results/natural-join">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Natural Join
          //   </button>
          // </Link>


          // <Link href="/query-results/cross-product">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Cross Product
          //   </button>
          // </Link>


          // <Link href="/query-results/outer-join">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Outer Join
          //   </button>
          // </Link>

          

          // <Link href="/query-results/join-using">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Join Using
          //   </button>
          // </Link>


          
          // <Link href="/query-results/join-on">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Join On
          //   </button>
          // </Link>

          
          // <Link href="/query-results/nested-any">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Nested Any
          //   </button>
          // </Link>


          
          // <Link href="/query-results/nested-from">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Nested From
          //   </button>
          // </Link>

          

          // <Link href="/query-results/order-by">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Order By
          //   </button>
          // </Link>


          
          // <Link href="/query-results/group-by">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Group By
          //   </button>
          // </Link>


          
          // <Link href="/query-results/having">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - Having
          //   </button>
          // </Link>


          
          // <Link href="/query-results/with-clause">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - With Clause
          //   </button>
          // </Link>

          // <Link href="/query-results/string-operations">
          //   <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
          //     Query - String Operations
          //   </button>  
          // </Link>

//           <Link href="/query-results/aggregate-functions">
//             <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
//               Query - Aggregate Functions
//             </button>  
//           </Link>

//         </div>
//       </Flex>
//       <Text className="mt-2 text-gray-600">Overview of your store's performance</Text>

//       {/* Summary Cards */}
//       <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
//         <Card decoration="top" decorationColor="blue">
//           <Flex justifyContent="start" className="space-x-4">
//             <div>
//               <Text className="text-gray-500">Total Products</Text>
//               <Metric className="text-blue-600">{dummyTotalProducts}</Metric>
//             </div>
//           </Flex>
//         </Card>
//         <Card decoration="top" decorationColor="green">
//           <Flex justifyContent="start" className="space-x-4">
//             <div>
//               <Text className="text-gray-500">Total Sales</Text>
//               <Metric className="text-green-600">${dummyTotalSales.toFixed(2)}</Metric>
//             </div>
//           </Flex>
//         </Card>
//       </Grid>

//       {/* Colorful Bar Chart */}
//       <Card className="mt-8 shadow-lg">
//         <Title className="text-lg text-indigo-600">Sales Overview (Colorful Bar Chart)</Title>
//         <Text className="text-gray-600">Daily sales performance</Text>
//         <BarChart
//             className="mt-6"
//             data={dummySalesData} // Use the provided `dummySalesData` for daily sales
//             index="date" // X-axis will show dates
//             categories={["amount"]} // Bars will represent the `amount`
//             colors={[
//                 "indigo", "cyan", "teal", "emerald", "yellow", "orange", "red",
//             ]} // A color for each bar
//             valueFormatter={dataFormatter} // Format values with a `$` prefix
//             yAxisWidth={60} // Reserve space for readable Y-axis labels
//             />

//       </Card>

//       {/* Sales Details Table */}
//       <Card className="mt-8 shadow-lg">
//         <Title className="text-lg text-indigo-600">Sales Details</Title>
//         <Table className="mt-6 border-t border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Items Sold</th>
//               <th className="px-4 py-2 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dummySalesData.map((sale, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{sale.date}</td>
//                 <td className="px-4 py-2">
//                   <Badge color="blue">{sale.items}</Badge>
//                 </td>
//                 <td className="px-4 py-2 text-right font-medium">${sale.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>
//     </main>
//     </ProtectedRoute>
//   );
// }




"use client";
import { Card, Grid, Table, Title, Text, BarChart, Flex, Metric, Badge } from "@tremor/react";
import Link from "next/link";
import ProtectedRoute from "../components/protected-route";

interface SaleData {
  date: string;
  amount: number;
  items: number;
}

const dummySalesData = [
  { date: "2024-01-01", amount: 1250.99, items: 15 },
  { date: "2024-01-02", amount: 2100.5, items: 23 },
  { date: "2024-01-03", amount: 1800.75, items: 18 },
  { date: "2024-01-04", amount: 3200.25, items: 30 },
  { date: "2024-01-05", amount: 1500.0, items: 12 },
  { date: "2024-01-06", amount: 2800.5, items: 25 },
  { date: "2024-01-07", amount: 3100.75, items: 28 },
];

const dummyTotalProducts = 150;
const dummyTotalSales = dummySalesData.reduce((sum, sale) => sum + sale.amount, 0);

const dataFormatter = (number: number) => "$" + Intl.NumberFormat("us").format(number);

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <main className="p-6 md:p-12 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-lg">
        <Title className="text-3xl font-bold text-indigo-700 mb-4">Admin Dashboard
          {/* <Badge size="xl" color="green"> */}
          <Badge className="text-2xl font-bold text-green-700 ml-4"> 
            (Live)
          </Badge>
        </Title>
        {/* Header */}
        <Flex justifyContent="between" className="items-center">
          {/* <Flex justifyContent="start" className="space-x-3 items-center"> */}
            {/* <Title className="text-3xl font-bold text-indigo-700">Admin Dashboard</Title>
            <Badge size="xl" color="green">
              Live
            </Badge> */}
          {/* </Flex> */}
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
            {/* Add additional query buttons as needed */}
          </div>
        </Flex>
        <Text className="mt-2 text-gray-600">Overview of your store's performance</Text>

        {/* Summary Cards */}
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
          <Card decoration="top" decorationColor="blue" className="shadow-lg">
            <Flex justifyContent="start" className="space-x-4">
              <div>
                <Text className="text-gray-500">Total Products</Text>
                <Metric className="text-blue-600">{dummyTotalProducts}</Metric>
              </div>
            </Flex>
          </Card>
          <Card decoration="top" decorationColor="green" className="shadow-lg">
            <Flex justifyContent="start" className="space-x-4">
              <div>
                <Text className="text-gray-500">Total Sales</Text>
                <Metric className="text-green-600">${dummyTotalSales.toFixed(2)}</Metric>
              </div>
            </Flex>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Card className="mt-8 shadow-lg">
          <Title className="text-lg font-semibold text-indigo-700">Sales Overview</Title>
          <Text className="text-gray-600">Daily sales performance</Text>
          <BarChart
            className="mt-6"
            data={dummySalesData}
            index="date"
            categories={["amount"]}
            colors={["cyan"]}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            showLegend
          />
        </Card>

        {/* Sales Details Table */}
        <Card className="mt-8 shadow-lg">
          <Title className="text-lg font-semibold text-indigo-700">Sales Details</Title>
          <Table className="mt-6 border-t border-gray-200">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Items Sold</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dummySalesData.map((sale, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">{sale.date}</td>
                  <td className="px-4 py-2">
                    <Badge color="blue">{sale.items}</Badge>
                  </td>
                  <td className="px-4 py-2 text-right font-medium">${sale.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </main>
    </ProtectedRoute>
  );
}
