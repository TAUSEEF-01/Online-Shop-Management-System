// // "use client";
// // import { Card, Grid, Table, Title, Text, LineChart, Color, Flex, Metric, Badge } from '@tremor/react';

// // interface SaleData {
// //   date: string;
// //   amount: number;
// //   items: number;
// // }

// // // Enhanced dummy data with more dates
// // const dummySalesData = [
// //   { date: '2024-01-01', amount: 1250.99, items: 15 },
// //   { date: '2024-01-02', amount: 2100.50, items: 23 },
// //   { date: '2024-01-03', amount: 1800.75, items: 18 },
// //   { date: '2024-01-04', amount: 3200.25, items: 30 },
// //   { date: '2024-01-05', amount: 1500.00, items: 12 },
// //   { date: '2024-01-06', amount: 2800.50, items: 25 },
// //   { date: '2024-01-07', amount: 3100.75, items: 28 },
// // ];

// // const dummyTotalProducts = 150;
// // const dummyTotalSales = dummySalesData.reduce((sum, sale) => sum + sale.amount, 0);

// // const dataFormatter = (number: number) => {
// //   return "$ " + Intl.NumberFormat("us").format(number).toString();
// // };

// // export default function AdminDashboard() {
// //   return (
// //     <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50 rounded-xl">
// //       <Flex justifyContent="start" className="space-x-2">
// //         <Title>Admin Dashboard</Title>
// //         <Badge size="xl">Live</Badge>
// //       </Flex>
// //       <Text className="mt-2">Overview of your store's performance</Text>

// //       <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
// //         <Card decoration="top" decorationColor="indigo">
// //           <Flex justifyContent="start" className="space-x-4">
// //             <div>
// //               <Text>Total Products</Text>
// //               <Metric>{dummyTotalProducts}</Metric>
// //             </div>
// //           </Flex>
// //         </Card>
// //         <Card decoration="top" decorationColor="green">
// //           <Flex justifyContent="start" className="space-x-4">
// //             <div>
// //               <Text>Total Sales</Text>
// //               <Metric>${dummyTotalSales.toFixed(2)}</Metric>
// //             </div>
// //           </Flex>
// //         </Card>
// //       </Grid>

// //       <div className="mt-6">
// //         <Card>
// //           <Title>Sales Trend</Title>
// //           <Text>Daily sales performance</Text>
// //           <LineChart
// //             className="mt-6"
// //             data={dummySalesData}
// //             index="date"
// //             categories={["amount"]}
// //             colors={["indigo"]}
// //             valueFormatter={dataFormatter}
// //             yAxisWidth={60}
// //             showAnimation={true}
// //             showLegend={false}
// //           />
// //         </Card>
// //       </div>

// //       <Card className="mt-6">
// //         <Title>Sales Details</Title>
// //         <Table className="mt-6">
// //           <thead>
// //             <tr>
// //               <th>Date</th>
// //               <th>Items Sold</th>
// //               <th>Amount</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {dummySalesData.map((sale, index) => (
// //               <tr key={index} className="hover:bg-gray-50">
// //                 <td>{sale.date}</td>
// //                 <td>
// //                   <Badge color="blue">{sale.items}</Badge>
// //                 </td>
// //                 <td className="text-right font-medium">${sale.amount.toFixed(2)}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       </Card>
// //     </main>
// //   );
// // }


// // // "use client";
// // // import { useEffect, useState } from 'react';
// // // import { Card, Grid, Table, Title, Text } from '@tremor/react';

// // // interface SaleData {
// // //   date: string;
// // //   amount: number;
// // //   items: number;
// // // }

// // // export default function AdminDashboard() {
// // //   const [totalProducts, setTotalProducts] = useState(0);
// // //   const [totalSales, setTotalSales] = useState(0);
// // //   const [salesData, setSalesData] = useState<SaleData[]>([]);

// // //   useEffect(() => {
// // //     // Fetch data from your API here
// // //     const fetchData = async () => {
// // //       try {
// // //         // Replace these with actual API calls
// // //         const productsResponse = await fetch('/api/products/count');
// // //         const salesResponse = await fetch('/api/sales/total');
// // //         const salesByDateResponse = await fetch('/api/sales/by-date');

// // //         const productsData = await productsResponse.json();
// // //         const salesData = await salesResponse.json();
// // //         const salesByDate = await salesByDateResponse.json();

// // //         setTotalProducts(productsData.count);
// // //         setTotalSales(salesData.total);
// // //         setSalesData(salesByDate);
// // //       } catch (error) {
// // //         console.error('Error fetching data:', error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   return (
// // //     <main className="p-4 md:p-10 mx-auto max-w-7xl">
// // //       <Title>Admin Dashboard</Title>
// // //       <Text>Overview of your store's performance</Text>

// // //       <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
// // //         <Card>
// // //           <Title>Total Products</Title>
// // //           <Text className="mt-2">{totalProducts}</Text>
// // //         </Card>
// // //         <Card>
// // //           <Title>Total Sales</Title>
// // //           <Text className="mt-2">${totalSales.toFixed(2)}</Text>
// // //         </Card>
// // //       </Grid>

// // //       <Card className="mt-6">
// // //         <Title>Sales by Date</Title>
// // //         <Table className="mt-6">
// // //           <thead>
// // //             <tr>
// // //               <th>Date</th>
// // //               <th>Items Sold</th>
// // //               <th>Amount</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {salesData.map((sale, index) => (
// // //               <tr key={index}>
// // //                 <td>{sale.date}</td>
// // //                 <td>{sale.items}</td>
// // //                 <td>${sale.amount.toFixed(2)}</td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </Table>
// // //       </Card>
// // //     </main>
// // //   );
// // // }




// "use client";
// import { Card, Grid, Table, Title, Text, BarChart, Flex, Metric, Badge } from "@tremor/react";

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
//     <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
//       {/* Header */}
//       <Flex justifyContent="start" className="space-x-3 items-center">
//         <Title className="text-2xl font-semibold">Admin Dashboard</Title>
//         <Badge size="xl" color="green">
//           Live
//         </Badge>
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
//   );
// }



"use client";
import { Card, Grid, Table, Title, Text, BarChart, Flex, Metric, Badge } from "@tremor/react";
import Link from 'next/link';

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
    <main className="p-6 md:p-12 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl mx-auto max-w-7xl shadow-md">
      {/* Header */}
      <Flex justifyContent="between" className="items-center">
        <Flex justifyContent="start" className="space-x-3 items-center">
          <Title className="text-2xl font-semibold">Admin Dashboard</Title>
          <Badge size="xl" color="green">
            Live
          </Badge>
        </Flex>
        <Link href="/add-product">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors">
            Add Product
          </button>
        </Link>
      </Flex>
      <Text className="mt-2 text-gray-600">Overview of your store's performance</Text>

      {/* Summary Cards */}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
        <Card decoration="top" decorationColor="blue">
          <Flex justifyContent="start" className="space-x-4">
            <div>
              <Text className="text-gray-500">Total Products</Text>
              <Metric className="text-blue-600">{dummyTotalProducts}</Metric>
            </div>
          </Flex>
        </Card>
        <Card decoration="top" decorationColor="green">
          <Flex justifyContent="start" className="space-x-4">
            <div>
              <Text className="text-gray-500">Total Sales</Text>
              <Metric className="text-green-600">${dummyTotalSales.toFixed(2)}</Metric>
            </div>
          </Flex>
        </Card>
      </Grid>

      {/* Colorful Bar Chart */}
      <Card className="mt-8 shadow-lg">
        <Title className="text-lg text-indigo-600">Sales Overview (Colorful Bar Chart)</Title>
        <Text className="text-gray-600">Daily sales performance</Text>
        <BarChart
            className="mt-6"
            data={dummySalesData} // Use the provided `dummySalesData` for daily sales
            index="date" // X-axis will show dates
            categories={["amount"]} // Bars will represent the `amount`
            colors={[
                "indigo", "cyan", "teal", "emerald", "yellow", "orange", "red",
            ]} // A color for each bar
            valueFormatter={dataFormatter} // Format values with a `$` prefix
            yAxisWidth={60} // Reserve space for readable Y-axis labels
            />

      </Card>

      {/* Sales Details Table */}
      <Card className="mt-8 shadow-lg">
        <Title className="text-lg text-indigo-600">Sales Details</Title>
        <Table className="mt-6 border-t border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Items Sold</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dummySalesData.map((sale, index) => (
              <tr key={index} className="hover:bg-gray-50">
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
  );
}
