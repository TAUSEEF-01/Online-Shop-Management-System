"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, UpdateProductData } from "../../utils/api";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import AdminLayout from "../components/admin-layout";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

const categories = [
  "socks",
  "basketballs",
  "apparel",
  "tshirts",
  "sports",
  "bathroom",
  "mens",
  "hoodies",
  "sweaters",
  "kitchen",
  "cleaning",
  "swimming",
  "robe",
  "swimsuit",
  "accessories",
  "Camera",
  "DSLR",
  "Photo",
];

const EditProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams?.get("productId");
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
        console.error("Failed to fetch product:", error);
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
        alert("Product updated successfully!");
        router.push("/update-product-info");
      } catch (error) {
        console.error("Failed to update product:", error);
        alert("Failed to update product. Please try again.");
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (
      product &&
      window.confirm("Are you sure you want to delete this product?")
    ) {
      try {
        await api.deleteProduct(product.prod_id);
        router.push("/update-product-info");
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const renderFormField = (
    label: string,
    name: string,
    type: string = "text",
    value: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full transition-colors focus:border-blue-500"
      />
    </div>
  );

  if (isLoading) {
    return (
      // <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product information...</p>
          </div>
        </div>
      // </AdminLayout>
    );
  }

  if (error) {
    return (
      // <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Product Not Found
              </h2>
              <p className="text-gray-600 mb-8">{error}</p>
              <div className="space-y-4">
                <Button
                  onClick={() => router.push("/update-product-info")}
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
          </Card>
        </div>
      // </AdminLayout>
    );
  }

  if (!product) return null;

  const handleCategoryToggle = (category: string) => {
    if (product) {
      const updatedKeywords = product.prod_keywords.includes(category)
        ? product.prod_keywords.filter((k) => k !== category)
        : [...product.prod_keywords, category];

      setProduct({
        ...product,
        prod_keywords: updatedKeywords,
      });
    }
  };

  return (
    // <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl rounded-xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Edit Product Details
            </h1>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField(
                  "Product Name",
                  "prod_name",
                  "text",
                  product.prod_name,
                  handleInputChange
                )}
                {renderFormField(
                  "Image URL",
                  "prod_image",
                  "text",
                  product.prod_image,
                  handleInputChange
                )}
                {renderFormField(
                  "Quantity",
                  "prod_quantity",
                  "number",
                  product.prod_quantity,
                  handleInputChange
                )}
                {renderFormField(
                  "Price",
                  "prod_price",
                  "number",
                  product.prod_price,
                  handleInputChange
                )}
                {renderFormField(
                  "Rating Stars",
                  "rating_stars",
                  "number",
                  product.rating_stars,
                  handleInputChange
                )}
                {renderFormField(
                  "Rating Count",
                  "rating_count",
                  "number",
                  product.rating_count,
                  handleInputChange
                )}
                {renderFormField(
                  "Discount (%)",
                  "prod_discount",
                  "number",
                  product.prod_discount,
                  handleInputChange
                )}

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Categories
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`py-2 px-4 rounded-full text-sm transition-colors ${
                          product.prod_keywords.includes(category)
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  onClick={handleDeleteProduct}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 transition-colors"
                >
                  Delete Product
                </Button>
                <Button
                  onClick={handleUpdateProduct}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Update Product
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    // </AdminLayout>
  );
};

export default EditProductPage;
