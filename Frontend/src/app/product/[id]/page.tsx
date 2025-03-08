"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { api } from "@/utils/api";
import { useCart } from "@/app/context/CartContext";
import Layout from "@/app/components/layout";
import ImageModal from "@/app/components/ImageModal";

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

const DUMMY_DESCRIPTION = `
Experience premium quality and exceptional comfort with this versatile product. 
Crafted with meticulous attention to detail, it features:

• Premium materials for lasting durability
• Ergonomic design for maximum comfort
• Versatile functionality for everyday use
• Easy maintenance and care
• Modern aesthetic that complements any style

Perfect for both casual and professional settings, this product combines 
style with practicality. Each piece is carefully inspected to ensure it meets 
our high standards of quality.
`;

export default function ProductDetail({ params }: { params: { id: string } }) {
  const unwrappedParams = React.use(params);
  const productId = unwrappedParams.id;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="p-6">
              <div
                className="relative h-[500px] w-full rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsImageModalOpen(true)}
              >
                <Image
                  src={product.prod_image || "/placeholder.svg"}
                  alt={`Image of ${product.prod_name}`}
                  layout="fill"
                  objectFit="contain"
                  priority
                  className="p-4"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.prod_name}
                </h1>

                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating_stars
                          ? "text-yellow-400 fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    ({product.rating_count} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-blue-600">
                    ${parseFloat(product.prod_price).toFixed(2)}
                  </span>
                  {parseFloat(product.prod_discount) > 0 && (
                    <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      {product.prod_discount}% OFF
                    </span>
                  )}
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.prod_keywords?.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {DUMMY_DESCRIPTION}
                  </p>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                onClick={addToCart}
                disabled={isLoading}
              >
                <ShoppingCart className="h-6 w-6" />
                {isLoading ? "Adding to Cart..." : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={product.prod_image}
        imageAlt={product.prod_name}
      />
    </Layout>
  );
}
