"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import logo from "./Featured_image.png";
import ImageModal from "./components/ImageModal";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Leather Backpack",
      price: "$89.99",
      rating: 4.8,
      image:
        "https://m.media-amazon.com/images/I/91yWDlPnDYL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      category: "accessories",
      description:
        "Handcrafted genuine leather backpack with laptop compartment. Water-resistant, durable, and stylish.",
      features: [
        "Genuine leather",
        "15-inch laptop pocket",
        "Water-resistant",
        "Multiple compartments",
      ],
      stockCount: 15,
      discount: "10% OFF",
    },
    {
      id: 2,
      name: "Countertop Blender - 64oz, 1400 Watts",
      price: "$16.90",
      rating: 4.7,
      image: "https://m.media-amazon.com/images/I/716wB8xkndL._AC_SX679_.jpg",
      category: "electronics",
      description:
        "Professional-grade blender with variable speed control. Perfect for smoothies, soups, and more.",
      features: [
        "1400W motor",
        "64oz capacity",
        "6 preset programs",
        "Dishwasher safe",
      ],
      stockCount: 23,
      discount: "15% OFF",
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: "$29.99",
      rating: 4.5,
      image: "https://m.media-amazon.com/images/I/71drNwPTpfL._AC_SX679_.jpg",
      category: "clothing",
      description:
        "100% organic cotton t-shirt. Sustainably sourced and ethically manufactured.",
      features: [
        "100% organic",
        "Pre-shrunk",
        "Breathable fabric",
        "Multiple colors",
      ],
      stockCount: 50,
      discount: "Buy 2 Get 1 Free",
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle",
      price: "$24.99",
      rating: 4.9,
      image:
        "https://m.media-amazon.com/images/I/614A3+XLTdL._AC_SY300_SX300_.jpg",
      category: "lifestyle",
      description:
        "Double-walled vacuum insulated bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
      features: [
        "24hr cold/12hr hot",
        "BPA-free",
        "Leak-proof",
        "Multiple sizes",
      ],
      stockCount: 35,
      discount: "20% OFF",
    },
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "electronics", name: "Electronics" },
    { id: "accessories", name: "Accessories" },
    { id: "lifestyle", name: "Lifestyle" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? featuredProducts
      : featuredProducts.filter(
          (product) => product.category === activeCategory
        );

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            entry.target.classList.contains("featured-item")
              ? "appear"
              : "visible"
          );
        } else {
          entry.target.classList.remove(
            entry.target.classList.contains("featured-item")
              ? "appear"
              : "visible"
          );
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    // Updated selectors
    document
      .querySelectorAll(".featured-item, .section-fade-up, .feature-card")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-20 section-fade-up">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Discover Quality Products for Every Need
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to our carefully curated collection of premium products
              designed to enhance your everyday life. From stylish accessories
              to practical essentials, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/Home">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 flex items-center gap-2">
                  Shop Now <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/">
                <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-md border border-gray-300 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
            <div className="relative md:w-full max-w-[1200px]">
              <div className="absolute inset-0 bg-blue-600/10 rounded-lg transform translate-x-3 translate-y-3 ml-4"></div>
              <Image
                className="relative w-full rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
                src={logo}
                alt="Featured Collection"
                width={900}
                height={900}
              />
              </div>
  
              {/* <Image
                src={logo}
                alt="Featured Collection"
                width={300}
                height={300}
                className="rounded-lg shadow-lg object-cover"
              /> */}
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-md">
                <p className="text-sm font-semibold">New Spring Collection</p>
                <p className="text-xs text-gray-500">Limited time offer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Link
              href="/Home"
              className="text-gray-600 hover:text-blue-500 flex items-center gap-1 text-base font-bold"
            >
              View All Products <ChevronRight size={16} />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-2 mb-6 gap-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-2 px-4 rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {/* ...existing category buttons... */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="featured-item opacity-0 blur-sm transform translate-y-4 transition-all duration-700 ease-out group rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg"
              >
                <div className="relative h-64 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      {product.discount}
                    </div>
                  )}
                  <button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white hover:bg-black hover:text-white text-black font-medium py-2 px-4 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100"
                    onClick={() =>
                      setSelectedImage({
                        url: product.image,
                        name: product.name,
                      })
                    }
                  >
                    Quick View
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.stockCount} in stock
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-blue-600">{product.price}</p>
                    {/* <button className="bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ...existing other sections... */}

      {/* Add Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          imageAlt={selectedImage.name}
        />
      )}

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12 section-fade-up">
            Why Shop With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-6">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Enjoy free shipping on all orders over $50
              </p>
            </div>

            <div className="feature-card text-center p-6">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                We stand behind every product we sell
              </p>
            </div>

            <div className="feature-card text-center p-6">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black text-white section-fade-up">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md focus:outline-none text-black"
            />
            <button className="bg-white text-black font-medium py-3 px-6 rounded-md hover:bg-gray-200 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
