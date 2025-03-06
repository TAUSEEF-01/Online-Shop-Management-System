"use client";

import { useState, useEffect } from "react";
import Layout from "../components/layout";
import ProductFilter from "../components/ProductFilter";
import { api } from "@/utils/api";
import ProtectedRoute from "../components/protected-route";

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

export default function Home() {
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
    " kitchen",
    "cleaning",
    "swimming",
    "robe",
    "swimsuit",
    "accessories",
    "Camera",
    "DSLR",
    "Photo",
  ];
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await api.getAllProducts();
        if (result.status === "success" && Array.isArray(result.data)) {
          console.log("Products fetched successfully:", result.data);
          setProducts(result.data);
        } else {
          console.error("Invalid response format:", result);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (value: string) => {
    const sortedProducts = [...products];

    switch (value) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.prod_price - b.prod_price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.prod_price - a.prod_price);
        break;
      case "rating-desc":
        sortedProducts.sort((a, b) => b.rating_stars - a.rating_stars);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.prod_price >= priceRange[0] / 100 &&
          product.prod_price <= priceRange[1] / 100 &&
          (selectedCategories.length === 0 ||
            product.prod_keywords?.some((keyword) =>
              selectedCategories.includes(keyword)
            )) &&
          product.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <ProtectedRoute>
      <Layout>
        <ProductFilter
          categories={categories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          filteredProducts={filteredProducts}
          onSort={handleSort}
        />
      </Layout>
    </ProtectedRoute>
  );
}
