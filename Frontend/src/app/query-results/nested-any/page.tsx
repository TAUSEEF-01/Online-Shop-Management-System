"use client";
import { useEffect, useState } from "react";
import { api, QueryResult } from "../../../utils/api";
import { Filter, Search, AlertTriangle, Database } from "lucide-react";

export default function QueryExecutionPage() {
  const [results, setResults] = useState<any[] | null>(null);
  const [filteredResults, setFilteredResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtering states
  const [filters, setFilters] = useState({
    prod_id: "",
    prod_name: "",
    prod_price_min: "",
    prod_price_max: "",
    rating_stars_min: "",
    rating_stars_max: "",
    rating_count_min: "",
    rating_count_max: "",
  });

  // Add a state for the order threshold
  const [orderThreshold, setOrderThreshold] = useState<number>(0);

  useEffect(() => {
    const handleExecuteQuery = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const response: QueryResult = await api.executeRawQuery(`
        //   SELECT user_id, user_name, user_email
        //   FROM users u
        //   WHERE u.user_id = ANY (
        //       SELECT user_id 
        //       FROM bill_detail 
        //       GROUP BY user_id 
        //       HAVING COUNT(order_id) > ${orderThreshold}
        //   );
        // `);


        // const response: QueryResult = await api.executeRawQuery(`
        //     SELECT user_id, user_name, user_email
        //     FROM users u
        //     WHERE u.user_id = ANY (
        //         SELECT user_id from bill_detail
        //         group by user_id
        //         HAVING COUNT(order_id) > ${orderThreshold}
        //     );
        // `);


        const response: QueryResult = await api.executeRawQuery(`
          SELECT u.user_id, u.user_name, u.user_email, 
          (SELECT COUNT(*) FROM bill_detail b WHERE b.user_id = u.user_id) AS order_count
          FROM users u
          WHERE u.user_id = ANY (
              SELECT user_id 
              FROM bill_detail
              GROUP BY user_id
              HAVING COUNT(order_id) > ${orderThreshold}
          );

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
  }, [orderThreshold]);

  // Apply filters
  useEffect(() => {
    if (!results) return;

    const filtered = results.filter((row) => {
      const prodIdMatch = filters.prod_id
        ? String(row.prod_id).includes(filters.prod_id)
        : true;

      const prodNameMatch = filters.prod_name
        ? String(row.prod_name)
            .toLowerCase()
            .includes(filters.prod_name.toLowerCase())
        : true;

      const priceMatch =
        (!filters.prod_price_min ||
          parseFloat(row.prod_price) >= parseFloat(filters.prod_price_min)) &&
        (!filters.prod_price_max ||
          parseFloat(row.prod_price) <= parseFloat(filters.prod_price_max));

      const ratingStarsMatch =
        (!filters.rating_stars_min ||
          parseFloat(row.rating_stars) >=
            parseFloat(filters.rating_stars_min)) &&
        (!filters.rating_stars_max ||
          parseFloat(row.rating_stars) <= parseFloat(filters.rating_stars_max));

      const ratingCountMatch =
        (!filters.rating_count_min ||
          parseFloat(row.rating_count) >=
            parseFloat(filters.rating_count_min)) &&
        (!filters.rating_count_max ||
          parseFloat(row.rating_count) <= parseFloat(filters.rating_count_max));

      return (
        prodIdMatch &&
        prodNameMatch &&
        priceMatch &&
        ratingStarsMatch &&
        ratingCountMatch
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

  const handleOrderThresholdChange = (e) => {
    setOrderThreshold(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
            Nested ANY Query Results
          </h1>
          <p className="text-gray-600">
            Products with prices above specific thresholds
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Database className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">
                Filter Results
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Text search filters */}
              {/* <div className="relative col-span-2">
                <input
                  type="text"
                  name="prod_name"
                  placeholder="Search Product Name"
                  value={filters.prod_name}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Search
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div> */}

              {/* Numeric filters */}
              <div className="relative">
                <input
                  type="number"
                  name="order_threshold"
                  placeholder="Order Threshold"
                  value={orderThreshold}
                  onChange={handleOrderThresholdChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              {/* <div className="relative">
                <input
                  type="number"
                  name="prod_price_min"
                  placeholder="Min Price"
                  value={filters.prod_price_min}
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
                  name="prod_price_max"
                  placeholder="Max Price"
                  value={filters.prod_price_max}
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
                  name="rating_stars_min"
                  placeholder="Min Rating Stars"
                  value={filters.rating_stars_min}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                  min="0"
                  max="5"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="rating_stars_max"
                  placeholder="Max Rating Stars"
                  value={filters.rating_stars_max}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                  min="0"
                  max="5"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="rating_count_min"
                  placeholder="Min Rating Count"
                  value={filters.rating_count_min}
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
                  name="rating_count_max"
                  placeholder="Max Rating Count"
                  value={filters.rating_count_max}
                  onChange={handleFilterChange}
                  className="w-full p-2 pl-8 border rounded-lg"
                />
                <Filter
                  className="absolute left-2 top-3 text-gray-400"
                  size={18}
                />
              </div> */}
            </div>
          </div>

          {/* Results Section */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-40 gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">Loading results...</p>
              </div>
            ) : error ? (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center">
                <AlertTriangle className="mr-3 text-red-500" size={24} />
                <span>{error}</span>
              </div>
            ) : (
              filteredResults && (
                <div className="animate-fade-in">
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
                  <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <p>Showing {filteredResults.length} results</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
