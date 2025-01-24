"use client";

import React, { useEffect, useState } from 'react';
import { api, Product, UpdateProductData } from '../../utils/api';
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
  const [editingProduct, setEditingProduct] = useState<UpdateProductData | null>(null);

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

  const handleEditClick = (product: Product) => {
    setEditingProduct({
      prod_id: product.prod_id,
      prod_name: product.prod_name,
      prod_image: product.prod_image,
      prod_quantity: product.prod_quantity,
      prod_price: product.prod_price,
      rating_stars: product.rating_stars,
      rating_count: product.rating_count,
      prod_discount: product.prod_discount,
      prod_keywords: product.prod_keywords,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      try {
        await api.updateProductInfo(editingProduct);
        setEditingProduct(null);
        const updatedProducts = await api.getAllProducts();
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };

  return (
    <div>
    <Title className="text-3xl font-bold text-indigo-700 mb-4">
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
              <Button className="w-full" onClick={() => handleEditClick(product)}>
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {editingProduct && (
        <div>
          <h2>Edit Product</h2>
          <input
            type="text"
            name="prod_name"
            value={editingProduct.prod_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="prod_image"
            value={editingProduct.prod_image}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="prod_quantity"
            value={editingProduct.prod_quantity}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="prod_price"
            value={editingProduct.prod_price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="rating_stars"
            value={editingProduct.rating_stars}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="rating_count"
            value={editingProduct.rating_count}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="prod_discount"
            value={editingProduct.prod_discount}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="prod_keywords"
            value={editingProduct.prod_keywords.join(', ')}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                prod_keywords: e.target.value.split(',').map((keyword) => keyword.trim()),
              })
            }
          />
          <Button onClick={handleUpdateProduct}>Update Product</Button>
        </div>
      )}
    </div>
  );
};

export default UpdateProductInfoPage;
