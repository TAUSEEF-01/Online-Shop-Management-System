"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Product } from '../../utils/api';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
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
  const router = useRouter();

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Title className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
        Update Product Information
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
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
  );
};

export default UpdateProductInfoPage;
