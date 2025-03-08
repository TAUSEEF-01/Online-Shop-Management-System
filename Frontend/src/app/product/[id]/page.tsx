"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { api } from "@/utils/api";
import { useCart } from "@/app/context/CartContext";
import Layout from "@/app/components/layout";

interface ProductData {
  prod_id: number;
  prod_name: string;
  prod_image: string;
  prod_quantity: number;
  prod_price: string;
  rating_stars: number;
  rating_count: number;
  prod_discount: string;
  prod_keywords: string[];
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const unwrappedParams = React.use(params);
  const productId = unwrappedParams.id;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { incrementCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.getProductInfo(productId);
        setProduct(response.data); // Access the data property from the response
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    setIsLoading(true);
    try {
      const userId = await api.getCurrentUserId();
      await api.addToCart(product!.prod_id, userId);
      incrementCart();
      alert("Added to cart successfully!");
    } catch (error: any) {
      alert("Item has already been added to your cart.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Layout>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src={product.prod_image || "/placeholder.svg"}
              alt={`Image of ${product.prod_name}`}
              layout="fill"
              objectFit="contain"
              priority
              className="p-4"
            />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.prod_name}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${parseFloat(product.prod_price).toFixed(2)}
                </span>
                {parseFloat(product.prod_discount) > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.prod_discount}% OFF
                  </span>
                )}
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              onClick={addToCart}
              disabled={isLoading}
            >
              <ShoppingCart className="h-5 w-5" />
              {isLoading ? "Adding to Cart..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
