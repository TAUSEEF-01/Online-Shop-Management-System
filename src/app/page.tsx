"use client";

import { useState, useEffect } from "react";
import Layout from "./components/layout";
import ProductCard from "./components/product-card";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import "./styles.css";
import { api } from '@/utils/api';

interface Product {
  prod_id: number;
  prod_name: string;
  prod_image: string;
  prod_quantity: number;
  prod_price: number;
  rating_stars: number;
  rating_count: number;
  prod_discount: number;
  prod_keywords: string[];
}

interface APIResponse {
  status: string;
  data: Product[];
  message: string;
}

export default function Home() {
  const categories = ['socks', 'basketballs', 'apparel', 'tshirts', 'sports', 'bathroom', 'mens', 'hoodies', 'sweaters', ' kitchen', 'cleaning', 'swimming', 'robe', 'swimsuit', 'accessories'];
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await api.getAllProducts();
        console.log('Raw API response:', result);

        if (result.status === 'success' && Array.isArray(result.data)) {
          console.log('Processed products:', result.data);
          setProducts(result.data);
        } else {
          console.error('Invalid response format:', result);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = Array.isArray(products) ? products.filter(
    (product) =>
      product.prod_price >= (priceRange[0] / 100) &&
      product.prod_price <= (priceRange[1] / 100) &&
      (selectedCategories.length === 0 ||
        product.prod_keywords?.some((keyword) =>
          selectedCategories.includes(keyword)
        )) &&
      product.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        {/* Existing sidebar */}
        <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0 md:sticky md:top-4 md:h-[calc(100vh-2rem)] overflow-auto">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <div>
              <Label>Price Range</Label>
              <Slider
                min={0}
                max={3000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2 [&>.range-thumb]:rounded-full [&>.range-thumb]:bg-white [&>.range-thumb]:border-2 [&>.range-thumb]:border-black"
              />
              <div className="flex justify-between mt-2">
                <span>${priceRange[0] / 100}</span>
                <span>${priceRange[1] / 100}</span>
              </div>
            </div>
            <div className="max-h-[50vh] overflow-y-auto">
              <Label className="mb-2">Categories</Label>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories(
                        checked
                          ? [...selectedCategories, category]
                          : selectedCategories.filter((c) => c !== category)
                      );
                    }}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content area with sticky search */}
        <div className="flex-1 mx-4">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md pt-4 pb-6 pl-2 pr-2">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {/* Add a pseudo-element for the shadow/gradient effect */}
            
          </div>
          {/* Add padding-top to create space below sticky search */}
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
                          count: product.rating_count
                        },
                        keywords: product.prod_keywords
                      }} 
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
