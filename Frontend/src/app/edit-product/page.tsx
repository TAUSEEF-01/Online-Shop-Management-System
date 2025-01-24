"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, UpdateProductData } from '../../utils/api';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

const EditProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams?.get('productId');
  const [product, setProduct] = useState<UpdateProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.getProductInfo(productId);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError(`Product with ID ${productId} not found`);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError("This product no longer exists or was deleted");
      } finally {
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

  const handleDeleteProduct = async () => {
    if (product && window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(product.prod_id);
        router.push('/update-product-info');
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <div className="space-y-4">
              <Button
                onClick={() => router.push('/update-product-info')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Back to Products
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
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

              <div className="flex justify-end gap-4 mt-8">
                <Button
                  onClick={handleDeleteProduct}
                  variant="destructive" // Assuming you have a destructive variant in your Button component
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Product
                </Button>
                <Button
                  onClick={handleUpdateProduct}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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
