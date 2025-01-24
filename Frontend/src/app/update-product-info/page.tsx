"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Product } from '../../utils/api';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Title } from '@tremor/react';

const UpdateProductInfoPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const categories = ['socks', 'basketballs', 'apparel', 'tshirts', 'sports', 'bathroom', 'mens', 'hoodies', 'sweaters', 'kitchen', 'cleaning', 'swimming', 'robe', 'swimsuit', 'accessories'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getAllProducts();
        if (response && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Invalid products data format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (productId: number) => {
    console.log("Edit button clicked for product ID:", productId);
    // router.push(`/edit-product/${productId}`);
    router.push(`/edit-product?productId=${productId}`);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.prod_price >= (priceRange[0] / 100) &&
      product.prod_price <= (priceRange[1] / 100) &&
      (selectedCategories.length === 0 ||
        product.prod_keywords?.some((keyword) =>
          selectedCategories.includes(keyword)
        )) &&
      product.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0">
          <div className="space-y-6 sticky top-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            
            <div className="space-y-4">
              <div>
                <Label>Price Range</Label>
                <Slider
                  min={0}
                  max={3000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2">
                  <span>${priceRange[0] / 100}</span>
                  <span>${priceRange[1] / 100}</span>
                </div>
              </div>

              <div>
                <Label>Categories</Label>
                <div className="mt-2 max-h-[50vh] overflow-y-auto space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
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
                      <label htmlFor={category} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid with Sticky Search */}
        <div className="flex-1">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md pt-4 pb-6">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Add padding-top to create space below sticky search */}
          <div className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.prod_id} className="h-[32rem] flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.prod_image || "/placeholder.svg"}
                        alt={product.prod_name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-2 h-14">
                      {product.prod_name}
                    </CardTitle>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating_stars)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating_count} reviews
                      </span>
                    </div>
                    <p className="text-2xl font-bold mb-2">
                      ${Number(product.prod_price).toFixed(2)}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2 max-h-20 overflow-y-auto">
                      {product.prod_keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full" onClick={() => handleEditClick(product.prod_id)}>
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductInfoPage;
