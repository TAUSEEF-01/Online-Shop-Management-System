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
import { Package, Users, PencilRuler, Database } from "lucide-react";

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
        <main className="p-6 md:p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl mx-auto max-w-7xl shadow-lg min-h-screen">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Monitor your store's performance and manage operations
            </p>
          </div>

          {/* Action Buttons Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link href="/add-product">
              <div className="group hover:scale-105 transition-all duration-200">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-blue-100 flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Add Product</h3>
                    <p className="text-sm text-gray-500">Create new listings</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/update-product-info">
              <div className="group hover:scale-105 transition-all duration-200">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-purple-100 flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <PencilRuler className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Update Products
                    </h3>
                    <p className="text-sm text-gray-500">
                      Modify existing items
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/users">
              <div className="group hover:scale-105 transition-all duration-200">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-pink-100 flex items-center space-x-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Manage Users
                    </h3>
                    <p className="text-sm text-gray-500">View all users</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Add new button for updating order status */}
            <Link href="/update-order-status">
              <div className="group hover:scale-105 transition-all duration-200">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-green-100 flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Database className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Update Order Status
                    </h3>
                    <p className="text-sm text-gray-500">
                      Change the status of orders
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card
              decoration="top"
              decorationColor="blue"
              className="shadow-lg backdrop-blur-sm bg-white/90"
            >
              <Flex justifyContent="start" className="space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <Text className="text-gray-600 text-sm">Total Products</Text>
                  <Metric className="text-blue-600">{totalProducts}</Metric>
                </div>
              </Flex>
            </Card>

            <Card
              decoration="top"
              decorationColor="green"
              className="shadow-lg backdrop-blur-sm bg-white/90"
            >
              <Flex justifyContent="start" className="space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <Text className="text-gray-600 text-sm">Total Sales</Text>
                  <Metric className="text-green-600">
                    ${totalSales.toFixed(2)}
                  </Metric>
                </div>
              </Flex>
            </Card>
          </div>


          {/* Charts and Tables */}
          <div className="space-y-8">
            <Card className="shadow-xl backdrop-blur-sm bg-white/90">
              <div className="p-6">
                <Title className="text-xl font-semibold text-gray-800 mb-2">
                  Sales Overview
                </Title>
                <Text className="text-gray-600 mb-6">
                  Daily sales performance analysis
                </Text>
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : salesData.length > 0 ? (
                  <BarChart
                    className="mt-6 h-[400px] bg-blue-50 rounded-lg p-4"
                    data={salesData}
                    index="date"
                    categories={["amount"]}
                    colors={["blue"]}
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
              </div>
            </Card>

            <Card className="shadow-xl backdrop-blur-sm bg-white/90">
              <div className="p-6">
                <Title className="text-xl font-semibold text-gray-800 mb-2">
                  Recent Sales
                </Title>
                <Text className="text-gray-600 mb-6">
                  Detailed view of recent transactions
                </Text>
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
                            <Badge className="text-indigo-600 ">
                              {sale.items}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 text-right font-medium">
                            ${sale.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          </div>


          {/* Database Queries Section */}
          
          <div className="mt-8">
            
            <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
            <Title className="text-2xl font-bold text-gray-800 mb-4 text-blue-500">
              Database Operations
            </Title>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <Text>Order and User details
                     {/* (Natural Join) */}
                     </Text>
                  <Link href="/query-results/natural-join">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Order details and Bill details
                     {/* (Cross Product) */}
                     </Text>
                  <Link href="/query-results/cross-product">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Outer Join</Text>
                  <Link href="/query-results/outer-join">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Join Using</Text>
                  <Link href="/query-results/join-using">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Join On</Text>
                  <Link href="/query-results/join-on">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Nested Any</Text>
                  <Link href="/query-results/nested-any">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Nested From</Text>
                  <Link href="/query-results/nested-from">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Order By</Text>
                  <Link href="/query-results/order-by">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Group By</Text>
                  <Link href="/query-results/group-by">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Having</Text>
                  <Link href="/query-results/having">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using With Clause</Text>
                  <Link href="/query-results/with-clause">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using String Operations</Text>
                  <Link href="/query-results/string-operations">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Aggregate Functions</Text>
                  <Link href="/query-results/aggregate-functions">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details of Payment Done</Text>
                  <Link href="/query-results/payment-done">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <Text>Details using Any Query</Text>
                  <Link href="/query-results/any-query">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow transition-all hover:shadow-md text-sm">
                      View Query
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          
        </main>
      </AdminLayout>
    </ProtectedRoute>
  );
}
