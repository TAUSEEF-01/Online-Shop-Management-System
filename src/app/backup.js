


// // // // import { useState } from 'react'
// // // // import Layout from '../components/layout'
// // // // import ProductCard from '../components/product-card'
// // // // import { Input } from "@/components/ui/input"
// // // // import { Slider } from "@/components/ui/slider"
// // // // import { Label } from "@/components/ui/label"
// // // // import { Checkbox } from "@/components/ui/checkbox"

// // // // // Mock data for products
// // // // const products = [
// // // //   { id: 1, name: "Laptop", price: 999, category: "Electronics" },
// // // //   { id: 2, name: "Smartphone", price: 699, category: "Electronics" },
// // // //   { id: 3, name: "Headphones", price: 199, category: "Electronics" },
// // // //   { id: 4, name: "T-shirt", price: 29, category: "Clothing" },
// // // //   { id: 5, name: "Jeans", price: 59, category: "Clothing" },
// // // //   { id: 6, name: "Sneakers", price: 89, category: "Footwear" },
// // // //   // Add more products as needed
// // // // ]

// // // // const categories = ["Electronics", "Clothing", "Footwear"]

// // // // export default function Home() {
// // // //   const [priceRange, setPriceRange] = useState([0, 1000])
// // // //   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
// // // //   const [searchTerm, setSearchTerm] = useState("")

// // // //   const filteredProducts = products.filter(product =>
// // // //     product.price >= priceRange[0] &&
// // // //     product.price <= priceRange[1] &&
// // // //     (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
// // // //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   )

// // // //   return (
// // // //     <Layout>
// // // //       <div className="flex">
// // // //         <aside className="w-64 pr-8">
// // // //           <h2 className="text-xl font-semibold mb-4">Filters</h2>
// // // //           <div className="mb-4">
// // // //             <Label>Price Range</Label>
// // // //             <Slider
// // // //               min={0}
// // // //               max={1000}
// // // //               step={10}
// // // //               value={priceRange}
// // // //               onValueChange={setPriceRange}
// // // //               className="mt-2"
// // // //             />
// // // //             <div className="flex justify-between mt-2">
// // // //               <span>${priceRange[0]}</span>
// // // //               <span>${priceRange[1]}</span>
// // // //             </div>
// // // //           </div>
// // // //           <div>
// // // //             <Label className="mb-2">Categories</Label>
// // // //             {categories.map(category => (
// // // //               <div key={category} className="flex items-center space-x-2 mt-1">
// // // //                 <Checkbox
// // // //                   id={category}
// // // //                   checked={selectedCategories.includes(category)}
// // // //                   onCheckedChange={(checked) => {
// // // //                     setSelectedCategories(
// // // //                       checked
// // // //                         ? [...selectedCategories, category]
// // // //                         : selectedCategories.filter(c => c !== category)
// // // //                     )
// // // //                   }}
// // // //                 />
// // // //                 <label htmlFor={category}>{category}</label>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </aside>
// // // //         <div className="flex-1">
// // // //           <div className="mb-4">
// // // //             <Input
// // // //               type="search"
// // // //               placeholder="Search products..."
// // // //               value={searchTerm}
// // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // //             />
// // // //           </div>
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //             {filteredProducts.map(product => (
// // // //               <ProductCard key={product.id} product={product} />
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </Layout>
// // // //   )
// // // // }

// // // 'use client';  // Add this line at the top of your file

// // // import { useState } from 'react'
// // // import Layout from '../components/layout'
// // // import ProductCard from '../components/product-card'
// // // import { Input } from "@/components/ui/input"
// // // import { Slider } from "@/components/ui/slider"
// // // import { Label } from "@/components/ui/label"
// // // import { Checkbox } from "@/components/ui/checkbox"

// // // // Mock data for products
// // // const products = [
// // //   { id: 1, name: "Laptop", price: 999, category: "Electronics" },
// // //   { id: 2, name: "Smartphone", price: 699, category: "Electronics" },
// // //   { id: 3, name: "Headphones", price: 199, category: "Electronics" },
// // //   { id: 4, name: "T-shirt", price: 29, category: "Clothing" },
// // //   { id: 5, name: "Jeans", price: 59, category: "Clothing" },
// // //   { id: 6, name: "Sneakers", price: 89, category: "Footwear" },
// // //   // Add more products as needed
// // // ]

// // // const categories = ["Electronics", "Clothing", "Footwear"]

// // // export default function Home() {
// // //   const [priceRange, setPriceRange] = useState([0, 1000])
// // //   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
// // //   const [searchTerm, setSearchTerm] = useState("")

// // //   const filteredProducts = products.filter(product =>
// // //     product.price >= priceRange[0] &&
// // //     product.price <= priceRange[1] &&
// // //     (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
// // //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
// // //   )

// // //   return (
// // //     <Layout>
// // //       <div className="flex">
// // //         <aside className="w-64 pr-8">
// // //           <h2 className="text-xl font-semibold mb-4">Filters</h2>
// // //           <div className="mb-4">
// // //             <Label>Price Range</Label>
// // //             <Slider
// // //               min={0}
// // //               max={1000}
// // //               step={10}
// // //               value={priceRange}
// // //               onValueChange={setPriceRange}
// // //               className="mt-2"
// // //             />
// // //             <div className="flex justify-between mt-2">
// // //               <span>${priceRange[0]}</span>
// // //               <span>${priceRange[1]}</span>
// // //             </div>
// // //           </div>
// // //           <div>
// // //             <Label className="mb-2">Categories</Label>
// // //             {categories.map(category => (
// // //               <div key={category} className="flex items-center space-x-2 mt-1">
// // //                 <Checkbox
// // //                   id={category}
// // //                   checked={selectedCategories.includes(category)}
// // //                   onCheckedChange={(checked) => {
// // //                     setSelectedCategories(
// // //                       checked
// // //                         ? [...selectedCategories, category]
// // //                         : selectedCategories.filter(c => c !== category)
// // //                     )
// // //                   }}
// // //                 />
// // //                 <label htmlFor={category}>{category}</label>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </aside>
// // //         <div className="flex-1">
// // //           <div className="mb-4">
// // //             <Input
// // //               type="search"
// // //               placeholder="Search products..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //             />
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {filteredProducts.map(product => (
// // //               <ProductCard key={product.id} product={product} />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Layout>
// // //   )
// // // }

// // "use client";

// // import { useState } from "react";
// // import Layout from "./components/layout";
// // import ProductCard from "./components/product-card";
// // import { Input } from "@/app/components/ui/input";
// // import { Slider } from "@/app/components/ui/slider";
// // import { Label } from "@/app/components/ui/label";
// // import { Checkbox } from "@/app/components/ui/checkbox";

// // // Mock data for products
// // const products = [
// //   {
// //     id: "1",
// //     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
// //     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
// //     rating: {
// //       stars: 4.5,
// //       count: 87,
// //     },
// //     priceCents: 1090,
// //     keywords: ["socks", "sports", "apparel"],
// //   },
// //   {
// //     id: "2",
// //     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
// //     name: "Intermediate Size Basketball",
// //     rating: {
// //       stars: 4,
// //       count: 127,
// //     },
// //     priceCents: 2095,
// //     keywords: ["sports", "basketball"],
// //   },
// //   {
// //     id: "3",
// //     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
// //     name: "Adults Plain Cotton T-Shirt - 2 Pack",
// //     rating: {
// //       stars: 4.5,
// //       count: 56,
// //     },
// //     priceCents: 799,
// //     keywords: ["tshirt", "apparel"],
// //   },
// //   {
// //     id: "4",
// //     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
// //     name: "Adults Plain Cotton T-Shirt - 2 Pack",
// //     rating: {
// //       stars: 4.5,
// //       count: 56,
// //     },
// //     priceCents: 799,
// //     keywords: ["tshirt", "apparel"],
// //   },
// //   {
// //     id: "5",
// //     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
// //     name: "Adults Plain Cotton T-Shirt - 2 Pack",
// //     rating: {
// //       stars: 4.5,
// //       count: 56,
// //     },
// //     priceCents: 799,
// //     keywords: ["tshirt", "apparel"],
// //   },
// // ];

// // const categories = ["sports", "apparel", "basketball", "socks", "tshirt"];

// // export default function Home() {
// //   const [priceRange, setPriceRange] = useState([0, 3000]);
// //   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const filteredProducts = products.filter(
// //     (product) =>
// //       product.priceCents >= priceRange[0] &&
// //       product.priceCents <= priceRange[1] &&
// //       (selectedCategories.length === 0 ||
// //         product.keywords.some((keyword) =>
// //           selectedCategories.includes(keyword)
// //         )) &&
// //       product.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <Layout>
// //       <div className="flex flex-col md:flex-row">
// //         <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0">
// //           <h2 className="text-xl font-semibold mb-4">Filters</h2>
// //           <div className="mb-4">
// //             <Label>Price Range</Label>
// //             <Slider
// //               min={0}
// //               max={3000}
// //               step={100}
// //               value={priceRange}
// //               onValueChange={setPriceRange}
// //               className="mt-2"
// //             />
// //             <div className="flex justify-between mt-2">
// //               <span>${priceRange[0] / 100}</span>
// //               <span>${priceRange[1] / 100}</span>
// //             </div>
// //           </div>
// //           <div>
// //             <Label className="mb-2">Categories</Label>
// //             {categories.map((category) => (
// //               <div key={category} className="flex items-center space-x-2 mt-1">
// //                 <Checkbox
// //                   id={category}
// //                   checked={selectedCategories.includes(category)}
// //                   onCheckedChange={(checked) => {
// //                     setSelectedCategories(
// //                       checked
// //                         ? [...selectedCategories, category]
// //                         : selectedCategories.filter((c) => c !== category)
// //                     );
// //                   }}
// //                 />
// //                 <label htmlFor={category}>{category}</label>
// //               </div>
// //             ))}
// //           </div>
// //         </aside>
// //         <div className="flex-1">
// //           <div className="mb-4">
// //             <Input
// //               type="search"
// //               placeholder="Search products..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredProducts.map((product) => (
// //               <ProductCard key={product.id} product={product} />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import Layout from "./components/layout";
// import ProductCard from "./components/product-card";
// import { Input } from "@/app/components/ui/input";
// import { Slider } from "@/app/components/ui/slider";
// import { Label } from "@/app/components/ui/label";
// import { Checkbox } from "@/app/components/ui/checkbox";
// import "./styles.css";

// // Mock data for products
// // Mock data for products
// const products = [
//   {
//     id: "1",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     // name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090,
//     keywords: ["socks", "sports", "apparel"],
//   },
//   {
//     id: "2",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: 2095,
//     keywords: ["sports", "basketball"],
//   },
//   {
//     id: "3",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//     keywords: ["tshirt", "apparel", "basketball"],
//   },
//   {
//     id: "4",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//     keywords: ["tshirt", "apparel"],
//   },
//   {
//     id: "5",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//     keywords: ["tshirt", "apparel"],
//   },
//   {
//     id: "6",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//     keywords: ["tshirt", "apparel"],
//   },
// ];

// const categories = ["sports", "apparel", "basketball", "socks", "tshirt"];

// export default function Home() {
//   const [priceRange, setPriceRange] = useState([0, 3000]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = products.filter(
//     (product) =>
//       product.priceCents >= priceRange[0] &&
//       product.priceCents <= priceRange[1] &&
//       (selectedCategories.length === 0 ||
//         product.keywords.some((keyword) =>
//           selectedCategories.includes(keyword)
//         )) &&
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Layout>
//       <div className="flex flex-col md:flex-row">
//         <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0">
//           <h2 className="text-xl font-semibold mb-4">Filters</h2>
//           <div className="mb-4">
//             <Label>Price Range</Label>
//             <Slider
//               min={0}
//               max={3000}
//               step={100}
//               value={priceRange}
//               onValueChange={setPriceRange}
//               className="mt-2 [&>.range-thumb]:rounded-full [&>.range-thumb]:bg-white [&>.range-thumb]:border-2 [&>.range-thumb]:border-black"
//             />

            
//             <div className="flex justify-between mt-2">
//               <span>${priceRange[0] / 100}</span>
//               <span>${priceRange[1] / 100}</span>
//             </div>
//           </div>
//           <div>
//             <Label className="mb-2">Categories</Label>
//             {categories.map((category) => (
//               <div key={category} className="flex items-center space-x-2 mt-1">
//                 <Checkbox
//                   id={category}
//                   checked={selectedCategories.includes(category)}
//                   onCheckedChange={(checked) => {
//                     setSelectedCategories(
//                       checked
//                         ? [...selectedCategories, category]
//                         : selectedCategories.filter((c) => c !== category)
//                     );
//                   }}
//                 />
//                 <label htmlFor={category}>{category}</label>
//               </div>
//             ))}
//           </div>
//         </aside>
//         <div className="flex-1  mx-4">
//             <div className="mb-4">
//             <Input
//               type="search"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="py-2 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//             />
//             </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div key={product.id} className="product-card">
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import Layout from "./components/layout";
// import ProductCard from "./components/product-card";
// import { Input } from "@/app/components/ui/input";
// import { Slider } from "@/app/components/ui/slider";
// import { Label } from "@/app/components/ui/label";
// import { Checkbox } from "@/app/components/ui/checkbox";
// import "./styles.css";

// interface Product {
//   prod_id: number;
//   prod_name: string;
//   prod_image: string;
//   prod_quantity: number;
//   prod_price: number;
//   rating_stars: number;
//   rating_count: number;
//   prod_discount: number;
//   prod_keywords: string[];
// }

// export default function Home() {
//   const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
//   const [products, setProducts] = useState<Product[]>([]);
//   const [priceRange, setPriceRange] = useState([0, 3000]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/products/allProducts');
//         const data = await response.json();
//         console.log('Raw API response:', data); // Debug log

//         // Check if data is an array, if not, check for data.rows
//         const productsArray = Array.isArray(data) ? data : data.rows || [];
//         console.log('Products array:', productsArray); // Debug log
        
//         // Validate and transform each product
//         const validProducts = productsArray.filter(product => 
//           product && 
//           typeof product === 'object' && 
//           'prod_id' in product
//         );
//         console.log('Valid products:', validProducts); // Debug log

//         setProducts(validProducts);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setProducts([]);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Modify price filtering logic
//   const filteredProducts = Array.isArray(products) ? products.filter(
//     (product) =>
//       product.prod_price >= (priceRange[0] / 100) && // Convert cents to dollars
//       product.prod_price <= (priceRange[1] / 100) &&
//       (selectedCategories.length === 0 ||
//         (Array.isArray(product.prod_keywords) && 
//          product.prod_keywords.some(keyword =>
//            selectedCategories.includes(keyword)
//          ))) &&
//       product.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
//   ) : [];

//   console.log('Filtered products:', filteredProducts); // Debug log

//   return (
//     <Layout>
//       <div className="flex flex-col md:flex-row">
//         <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0">
//           <h2 className="text-xl font-semibold mb-4">Filters</h2>
//           <div className="mb-4">
//             <Label>Price Range</Label>
//             <Slider
//               min={0}
//               max={3000}
//               step={100}
//               value={priceRange}
//               onValueChange={setPriceRange}
//               className="mt-2 [&>.range-thumb]:rounded-full [&>.range-thumb]:bg-white [&>.range-thumb]:border-2 [&>.range-thumb]:border-black"
//             />
//             <div className="flex justify-between mt-2">
//               <span>${priceRange[0] / 100}</span>
//               <span>${priceRange[1] / 100}</span>
//             </div>
//           </div>
//           <div>
//             <Label className="mb-2">Categories</Label>
//             {categories.map((category) => (
//               <div key={category} className="flex items-center space-x-2 mt-1">
//                 <Checkbox
//                   id={category}
//                   checked={selectedCategories.includes(category)}
//                   onCheckedChange={(checked) => {
//                     setSelectedCategories(
//                       checked
//                         ? [...selectedCategories, category]
//                         : selectedCategories.filter((c) => c !== category)
//                     );
//                   }}
//                 />
//                 <label htmlFor={category}>{category}</label>
//               </div>
//             ))}
//           </div>
//         </aside>
//         <div className="flex-1 mx-4">
//           <div className="mb-4">
//             <Input
//               type="search"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="py-2 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {loading ? (
//               <p>Loading products...</p>
//             ) : (
//               filteredProducts.map((product) => (
//                 <div key={product.prod_id} className="product-card">
//                   <ProductCard 
//                     product={{
//                       id: product.prod_id.toString(),
//                       name: product.prod_name,
//                       image: product.prod_image,
//                       priceCents: Math.round(product.prod_price * 100),
//                       rating: {
//                         stars: product.rating_stars,
//                         count: product.rating_count
//                       },
//                       keywords: product.prod_keywords
//                     }} 
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }








// // // import { useState } from 'react'
// // // import Layout from '../components/layout'
// // // import ProductCard from '../components/product-card'
// // // import { Input } from "@/components/ui/input"
// // // import { Slider } from "@/components/ui/slider"
// // // import { Label } from "@/components/ui/label"
// // // import { Checkbox } from "@/components/ui/checkbox"

// // // // Mock data for products
// // // const products = [
// // //   { id: 1, name: "Laptop", price: 999, category: "Electronics" },
// // //   { id: 2, name: "Smartphone", price: 699, category: "Electronics" },
// // //   { id: 3, name: "Headphones", price: 199, category: "Electronics" },
// // //   { id: 4, name: "T-shirt", price: 29, category: "Clothing" },
// // //   { id: 5, name: "Jeans", price: 59, category: "Clothing" },
// // //   { id: 6, name: "Sneakers", price: 89, category: "Footwear" },
// // //   // Add more products as needed
// // // ]

// // // const categories = ["Electronics", "Clothing", "Footwear"]

// // // export default function Home() {
// // //   const [priceRange, setPriceRange] = useState([0, 1000])
// // //   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
// // //   const [searchTerm, setSearchTerm] = useState("")

// // //   const filteredProducts = products.filter(product =>
// // //     product.price >= priceRange[0] &&
// // //     product.price <= priceRange[1] &&
// // //     (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
// // //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
// // //   )

// // //   return (
// // //     <Layout>
// // //       <div className="flex">
// // //         <aside className="w-64 pr-8">
// // //           <h2 className="text-xl font-semibold mb-4">Filters</h2>
// // //           <div className="mb-4">
// // //             <Label>Price Range</Label>
// // //             <Slider
// // //               min={0}
// // //               max={1000}
// // //               step={10}
// // //               value={priceRange}
// // //               onValueChange={setPriceRange}
// // //               className="mt-2"
// // //             />
// // //             <div className="flex justify-between mt-2">
// // //               <span>${priceRange[0]}</span>
// // //               <span>${priceRange[1]}</span>
// // //             </div>
// // //           </div>
// // //           <div>
// // //             <Label className="mb-2">Categories</Label>
// // //             {categories.map(category => (
// // //               <div key={category} className="flex items-center space-x-2 mt-1">
// // //                 <Checkbox
// // //                   id={category}
// // //                   checked={selectedCategories.includes(category)}
// // //                   onCheckedChange={(checked) => {
// // //                     setSelectedCategories(
// // //                       checked
// // //                         ? [...selectedCategories, category]
// // //                         : selectedCategories.filter(c => c !== category)
// // //                     )
// // //                   }}
// // //                 />
// // //                 <label htmlFor={category}>{category}</label>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </aside>
// // //         <div className="flex-1">
// // //           <div className="mb-4">
// // //             <Input
// // //               type="search"
// // //               placeholder="Search products..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //             />
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //             {filteredProducts.map(product => (
// // //               <ProductCard key={product.id} product={product} />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Layout>
// // //   )
// // // }

// // 'use client';  // Add this line at the top of your file

// // import { useState } from 'react'
// // import Layout from '../components/layout'
// // import ProductCard from '../components/product-card'
// // import { Input } from "@/components/ui/input"
// // import { Slider } from "@/components/ui/slider"
// // import { Label } from "@/components/ui/label"
// // import { Checkbox } from "@/components/ui/checkbox"

// // // Mock data for products
// // const products = [
// //   { id: 1, name: "Laptop", price: 999, category: "Electronics" },
// //   { id: 2, name: "Smartphone", price: 699, category: "Electronics" },
// //   { id: 3, name: "Headphones", price: 199, category: "Electronics" },
// //   { id: 4, name: "T-shirt", price: 29, category: "Clothing" },
// //   { id: 5, name: "Jeans", price: 59, category: "Clothing" },
// //   { id: 6, name: "Sneakers", price: 89, category: "Footwear" },
// //   // Add more products as needed
// // ]

// // const categories = ["Electronics", "Clothing", "Footwear"]

// // export default function Home() {
// //   const [priceRange, setPriceRange] = useState([0, 1000])
// //   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
// //   const [searchTerm, setSearchTerm] = useState("")

// //   const filteredProducts = products.filter(product =>
// //     product.price >= priceRange[0] &&
// //     product.price <= priceRange[1] &&
// //     (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
// //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   )

// //   return (
// //     <Layout>
// //       <div className="flex">
// //         <aside className="w-64 pr-8">
// //           <h2 className="text-xl font-semibold mb-4">Filters</h2>
// //           <div className="mb-4">
// //             <Label>Price Range</Label>
// //             <Slider
// //               min={0}
// //               max={1000}
// //               step={10}
// //               value={priceRange}
// //               onValueChange={setPriceRange}
// //               className="mt-2"
// //             />
// //             <div className="flex justify-between mt-2">
// //               <span>${priceRange[0]}</span>
// //               <span>${priceRange[1]}</span>
// //             </div>
// //           </div>
// //           <div>
// //             <Label className="mb-2">Categories</Label>
// //             {categories.map(category => (
// //               <div key={category} className="flex items-center space-x-2 mt-1">
// //                 <Checkbox
// //                   id={category}
// //                   checked={selectedCategories.includes(category)}
// //                   onCheckedChange={(checked) => {
// //                     setSelectedCategories(
// //                       checked
// //                         ? [...selectedCategories, category]
// //                         : selectedCategories.filter(c => c !== category)
// //                     )
// //                   }}
// //                 />
// //                 <label htmlFor={category}>{category}</label>
// //               </div>
// //             ))}
// //           </div>
// //         </aside>
// //         <div className="flex-1">
// //           <div className="mb-4">
// //             <Input
// //               type="search"
// //               placeholder="Search products..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {filteredProducts.map(product => (
// //               <ProductCard key={product.id} product={product} />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   )
// // }

// "use client";

// import { useState } from "react";
// import Layout from "./components/layout";
// import ProductCard from "./components/product-card";
// import { Input } from "@/app/components/ui/input";
// import { Slider } from "@/app/components/ui/slider";
// import { Label } from "@/app/components/ui/label";
// import { Checkbox } from "@/app/components/ui/checkbox";

// // Mock data for products
// const products = [
//   {
//     id: "1",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090,
//     keywords: ["socks", "sports", "apparel"],
//   },
//   {
//     id: "2",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: 2095,
//     keywords: ["sports", "basketball"],
//   },
//   {
//     id: "3",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//     keywords: ["tshirt", "apparel"],
//   },
//   {
//     id: "4",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//     keywords: ["tshirt", "apparel"],
//   },
//   {
//     id: "5",
//     image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: 799,
//     keywords: ["tshirt", "apparel"],
//   },
// ];

// const categories = ["sports", "apparel", "basketball", "socks", "tshirt"];

// export default function Home() {
//   const [priceRange, setPriceRange] = useState([0, 3000]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = products.filter(
//     (product) =>
//       product.priceCents >= priceRange[0] &&
//       product.priceCents <= priceRange[1] &&
//       (selectedCategories.length === 0 ||
//         product.keywords.some((keyword) =>
//           selectedCategories.includes(keyword)
//         )) &&
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Layout>
//       <div className="flex flex-col md:flex-row">
//         <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0">
//           <h2 className="text-xl font-semibold mb-4">Filters</h2>
//           <div className="mb-4">
//             <Label>Price Range</Label>
//             <Slider
//               min={0}
//               max={3000}
//               step={100}
//               value={priceRange}
//               onValueChange={setPriceRange}
//               className="mt-2"
//             />
//             <div className="flex justify-between mt-2">
//               <span>${priceRange[0] / 100}</span>
//               <span>${priceRange[1] / 100}</span>
//             </div>
//           </div>
//           <div>
//             <Label className="mb-2">Categories</Label>
//             {categories.map((category) => (
//               <div key={category} className="flex items-center space-x-2 mt-1">
//                 <Checkbox
//                   id={category}
//                   checked={selectedCategories.includes(category)}
//                   onCheckedChange={(checked) => {
//                     setSelectedCategories(
//                       checked
//                         ? [...selectedCategories, category]
//                         : selectedCategories.filter((c) => c !== category)
//                     );
//                   }}
//                 />
//                 <label htmlFor={category}>{category}</label>
//               </div>
//             ))}
//           </div>
//         </aside>
//         <div className="flex-1">
//           <div className="mb-4">
//             <Input
//               type="search"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }



"use client";

import { useState } from "react";
import Layout from "./components/layout";
import ProductCard from "./components/product-card";
import { Input } from "@/app/components/ui/input";
import { Slider } from "@/app/components/ui/slider";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import "./styles.css";

// Mock data for products
// Mock data for products
const products = [
  {
    id: "1",
    image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
    // name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  },
  {
    id: "2",
    image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127,
    },
    priceCents: 2095,
    keywords: ["sports", "basketball"],
  },
  {
    id: "3",
    image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirt", "apparel", "basketball"],
  },
  {
    id: "4",
    image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirt", "apparel"],
  },
  {
    id: "5",
    image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirt", "apparel"],
  },
  {
    id: "6",
    image: "https://media.istockphoto.com/id/1480105317/photo/close-up-image-of-basketball-ball-over-floor-in-the-gym-orange-basketball-ball-on-wooden.jpg?s=2048x2048&w=is&k=20&c=L51G89q0QQNiLjHKVSPK9fu0JyZTyWOgfUOcyF3Bfuc=",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirt", "apparel"],
  },
];

const categories = ["sports", "apparel", "basketball", "socks", "tshirt"];

export default function Home() {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.priceCents >= priceRange[0] &&
      product.priceCents <= priceRange[1] &&
      (selectedCategories.length === 0 ||
        product.keywords.some((keyword) =>
          selectedCategories.includes(keyword)
        )) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 pr-8 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <Label>Price Range</Label>
            <Slider
              min={0}
              max={3000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2 [&>.range-thumb]:rounded-full [&>.range-thumb]:bg-white [&>.range-thumb]:border-2 [&>.range-thumb]:border-black"
            />

            
            <div className="flex justify-between mt-2">
              <span>${priceRange[0] / 100}</span>
              <span>${priceRange[1] / 100}</span>
            </div>
          </div>
          <div>
            <Label className="mb-2">Categories</Label>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 mt-1">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(
                      checked
                        ? [...selectedCategories, category]
                        : selectedCategories.filter((c) => c !== category)
                    );
                  }}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </aside>
        <div className="flex-1  mx-4">
            <div className="mb-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 px-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
