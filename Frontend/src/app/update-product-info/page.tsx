"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, Product } from "../../utils/api";
import ProductFilter from "../components/ProductFilter";
import AdminLayout from "../components/admin-layout";

const UpdateProductInfoPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getAllProducts();
        if (response && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Invalid products data format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (productId: number) => {
    router.push(`/edit-product?productId=${productId}`);
  };

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
    }
    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.prod_price >= priceRange[0] / 100 &&
      product.prod_price <= priceRange[1] / 100 &&
      (selectedCategories.length === 0 ||
        product.prod_keywords?.some((keyword) =>
          selectedCategories.includes(keyword)
        )) &&
      product.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
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
          isEditMode={true}
          onEdit={handleEditClick}
        />
      </div>
    </AdminLayout>
  );
};

export default UpdateProductInfoPage;
