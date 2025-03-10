"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, Search, AlertTriangle, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update filtering states
  const [filters, setFilters] = useState({
    order_id: "",
    user_id: "",
    order_date: "",
    total_amt_min: "",
    total_amt_max: "",
    order_status: "",
    user_name: "",
  });

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
    //     const response: QueryResult = await api.executeRawQuery(`
    //   SELECT o.*, u.user_name 
    //   FROM orders o 
    //   FULL OUTER JOIN users u 
    //   ON o.user_id = u.user_id;
    // `);


    const response: QueryResult = await api.executeRawQuery(`
      SELECT u.user_id, u.user_name, u.user_email, u.user_contact_no
      FROM users u
      LEFT JOIN orders o ON u.user_id = o.user_id
      WHERE o.user_id IS NULL;

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

  // Update filter logic
  useEffect(() => {
    if (!results) return;

    const filtered = results.filter((row) => {
      // const orderIdMatch = filters.order_id
      //   ? String(row.order_id).includes(filters.order_id)
      //   : true;

      const userIdMatch = filters.user_id
        ? String(row.user_id).includes(filters.user_id)
        : true;

      // const orderDateMatch = filters.order_date
      //   ? String(row.order_date).includes(filters.order_date)
      //   : true;

      // const totalAmtMatch =
      //   (!filters.total_amt_min ||
      //     parseFloat(row.total_amt) >= parseFloat(filters.total_amt_min)) &&
      //   (!filters.total_amt_max ||
      //     parseFloat(row.total_amt) <= parseFloat(filters.total_amt_max));

      // const statusMatch = filters.order_status
      //   ? String(row.order_status)
      //       .toLowerCase()
      //       .includes(filters.order_status.toLowerCase())
      //   : true;

      const userNameMatch = filters.user_name
        ? String(row.user_name)
            .toLowerCase()
            .includes(filters.user_name.toLowerCase())
        : true;

      return (
        // orderIdMatch &&
        userIdMatch &&
        // orderDateMatch &&
        // totalAmtMatch &&
        // statusMatch &&
        userNameMatch
      );
    });

    setFilteredResults(filtered);
  }, [filters, results]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
            Outer Join Query Results
          </h1>
          <p className="text-gray-600">
          Users who didn't give any orders
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Filter Results
              </h2>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4">
              {/* <div className="relative">
                <input
                  type="text"
                  name="order_id"
                  placeholder="Search Order ID"
                  value={filters.order_id}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div> */}
              <div className="relative">
                <input
                  type="text"
                  name="user_id"
                  placeholder="Search User ID"
                  value={filters.user_id}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              {/* <div className="relative">
                <input
                  type="text"
                  name="order_date"
                  placeholder="Search Order Date"
                  value={filters.order_date}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
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
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
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
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
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
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div> */}
              <div className="relative">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Search User Name"
                  value={filters.user_name}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
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
            <div className="bg-gray-100 rounded-lg p-4">
              {/* <h2 className="text-xl font-semibold mb-4">
                Results of the outer join query
              </h2> */}
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
                          <td key={j} className="px-4 py-3 text-sm">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
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
