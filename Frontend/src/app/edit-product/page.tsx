"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, UpdateProductData } from '../../utils/api';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

const EditProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams?.get('productId'); // Ensure searchParams is not undefined
  const [product, setProduct] = useState<UpdateProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Handle loading state

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await api.getProductInfo(productId);
          setProduct(response.data); // Adjust for nested "data" property
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setIsLoading(false); // Ensure loading is complete
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (product) {
      try {
        await api.updateProductInfo(product);
        router.push('/update-product-info');
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-lg rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Edit Product Details
            </h1>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="prod_name"
                    value={product.prod_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    name="prod_image"
                    value={product.prod_image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="prod_quantity"
                    value={product.prod_quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="prod_price"
                    value={product.prod_price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Rating Stars</label>
                  <input
                    type="number"
                    name="rating_stars"
                    value={product.rating_stars}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Rating Count</label>
                  <input
                    type="number"
                    name="rating_count"
                    value={product.rating_count}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    name="prod_discount"
                    value={product.prod_discount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Keywords</label>
                  <input
                    type="text"
                    name="prod_keywords"
                    value={product.prod_keywords.join(', ')}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        prod_keywords: e.target.value.split(',').map((keyword) => keyword.trim()),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter keywords separated by commas"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  onClick={handleUpdateProduct}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Update Product
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProductPage;
