import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import ProductCard from "../components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface ProductFilterProps {
  categories: string[];
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  loading: boolean;
  filteredProducts: any[];
  onSort: (value: string) => void;
  isEditMode?: boolean;
  onEdit?: (productId: number) => void;
}

export default function ProductFilter({
  categories,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  searchTerm,
  setSearchTerm,
  loading,
  filteredProducts,
  onSort,
  isEditMode = false,
  onEdit,
}: ProductFilterProps) {
  const [sortValue, setSortValue] = useState("");

  const handleSort = (value: string) => {
    setSortValue(value);
    onSort(value);
  };

  return (
    <div className="flex flex-col md:flex-row mx-4">
      {/* Existing sidebar */}
      <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0 md:sticky md:top-4 md:h-[calc(100vh-2rem)] overflow-auto">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <div>
            <Label className="mb-2 block text-lg font-bold text-indigo-700">
              Price Range
            </Label>
            <Slider
              min={0}
              max={30000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2 [&>.range-thumb]:rounded-full [&>.range-thumb]:bg-white [&>.range-thumb]:border-2 [&>.range-thumb]:border-black"
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0] / 100}</span>
              <span>${priceRange[1] / 1000}</span>
            </div>
          </div>
          <div>
            <Label className="mb-2 block text-lg font-bold text-indigo-700">
              Categories
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategories(
                      selectedCategories.includes(category)
                        ? selectedCategories.filter((c) => c !== category)
                        : [...selectedCategories, category]
                    );
                  }}
                  className={`py-2 px-4 rounded-full whitespace-nowrap text-sm ${
                    selectedCategories.includes(category)
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area with sticky search and sort */}
      <div className="flex-1 mx-4">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md pt-4 pb-6 pl-2 pr-2">
          <div className="flex items-center gap-4 mb-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <Select value={sortValue} onValueChange={handleSort}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading products...</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.prod_id} className="product-card">
                  <ProductCard
                    product={{
                      id: product.prod_id.toString(),
                      name: product.prod_name,
                      image: product.prod_image,
                      priceCents: Math.round(product.prod_price * 100), // Convert dollars to cents for display
                      rating: {
                        stars: product.rating_stars,
                        count: product.rating_count,
                      },
                      keywords: product.prod_keywords,
                    }}
                    isEditMode={isEditMode}
                    onEdit={() => onEdit?.(product.prod_id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
