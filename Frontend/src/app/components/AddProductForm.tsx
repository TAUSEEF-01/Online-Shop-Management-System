// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";
// import {
//   Package,
//   Tag,
//   Star,
//   Percent,
//   Image as ImageIcon,
//   ShoppingCart,
// } from "lucide-react";
// import Image from "next/image";

// const categories = [
//   "socks",
//   "basketballs",
//   "apparel",
//   "tshirts",
//   "sports",
//   "bathroom",
//   "mens",
//   "hoodies",
//   "sweaters",
//   "kitchen",
//   "cleaning",
//   "swimming",
//   "robe",
//   "swimsuit",
//   "accessories",
//   "Camera",
//   "DSLR",
//   "Photo",
// ];

// export default function AddProductForm() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     prod_name: "",
//     prod_image: "",
//     prod_quantity: 0,
//     prod_price: 0,
//     rating_stars: 0,
//     rating_count: 0,
//     prod_discount: 0,
//     prod_keywords: [] as string[],
//   });
//   const [message, setMessage] = useState({ type: "", content: "" });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       console.log("Form data:", formData);
//       const response = await fetch("http://localhost:5000/products/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Product added successfully!");
//         router.push("/admin");
//         // Reset form
//         setFormData({
//           prod_name: "",
//           prod_image: "",
//           prod_quantity: 0,
//           prod_price: 0,
//           rating_stars: 0,
//           rating_count: 0,
//           prod_discount: 0,
//           prod_keywords: [],
//         });
//       } else {
//         setMessage({
//           type: "error",
//           content: data.message || "Failed to add product",
//         });
//       }
//     } catch (error) {
//       setMessage({ type: "error", content: "Error connecting to server" });
//     }
//   };

//   const handleCategoryToggle = (category: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       prod_keywords: prev.prod_keywords.includes(category)
//         ? prev.prod_keywords.filter((k) => k !== category)
//         : [...prev.prod_keywords, category],
//     }));
//   };

//   const renderImagePreview = () => (
//     <div className="col-span-2 mt-4">
//       <Label className="text-sm font-medium text-gray-700">Image Preview</Label>
//       <div className="mt-2 relative w-full h-[200px] rounded-lg overflow-hidden border border-gray-200">
//         {formData.prod_image ? (
//           <Image
//             src={formData.prod_image}
//             alt="Product preview"
//             layout="fill"
//             objectFit="contain"
//             className="bg-white"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">
//             No image URL provided
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
//         <div className="bg-blue-500 text-white p-6 flex items-center">
//           <Package className="w-8 h-8 mr-3" />
//           <h1 className="text-2xl font-bold">Add New Product</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {message.content && (
//             <div
//               className={`p-4 rounded-md flex items-center ${
//                 message.type === "success"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {message.type === "success" ? (
//                 <ShoppingCart className="mr-2" />
//               ) : null}
//               {message.content}
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="prod_name" className="flex items-center">
//               <Tag className="w-4 h-4 mr-2 text-blue-500" /> Product Name
//             </Label>
//             <Input
//               id="prod_name"
//               value={formData.prod_name}
//               onChange={(e) =>
//                 setFormData({ ...formData, prod_name: e.target.value })
//               }
//               className="focus:ring-2 focus:ring-blue-200 transition-all"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="prod_image" className="flex items-center">
//               <ImageIcon className="w-4 h-4 mr-2 text-blue-500" /> Image URL
//             </Label>
//             <Input
//               id="prod_image"
//               value={formData.prod_image}
//               onChange={(e) =>
//                 setFormData({ ...formData, prod_image: e.target.value })
//               }
//               className="focus:ring-2 focus:ring-blue-200 transition-all"
//               required
//             />
//           </div>

//           {renderImagePreview()}

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="prod_quantity" className="flex items-center">
//                 <Package className="w-4 h-4 mr-2 text-blue-500" /> Quantity
//               </Label>
//               <Input
//                 id="prod_quantity"
//                 type="number"
//                 value={formData.prod_quantity}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     prod_quantity: Number(e.target.value),
//                   })
//                 }
//                 className="focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="prod_price" className="flex items-center">
//                 <Tag className="w-4 h-4 mr-2 text-blue-500" /> Price
//               </Label>
//               <Input
//                 id="prod_price"
//                 type="number"
//                 step="0.01"
//                 value={formData.prod_price}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     prod_price: Number(e.target.value),
//                   })
//                 }
//                 className="focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="rating_stars" className="flex items-center">
//                 <Star className="w-4 h-4 mr-2 text-blue-500" /> Rating Stars
//               </Label>
//               <Input
//                 id="rating_stars"
//                 type="number"
//                 min="0"
//                 max="5"
//                 step="0.1"
//                 value={formData.rating_stars}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     rating_stars: Number(e.target.value),
//                   })
//                 }
//                 className="focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="rating_count" className="flex items-center">
//                 <Star className="w-4 h-4 mr-2 text-blue-500" /> Rating Count
//               </Label>
//               <Input
//                 id="rating_count"
//                 type="number"
//                 value={formData.rating_count}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     rating_count: Number(e.target.value),
//                   })
//                 }
//                 className="focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="prod_discount" className="flex items-center">
//                 <Percent className="w-4 h-4 mr-2 text-blue-500" /> Discount
//               </Label>
//               <Input
//                 id="prod_discount"
//                 type="number"
//                 step="0.01"
//                 value={formData.prod_discount}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     prod_discount: Number(e.target.value),
//                   })
//                 }
//                 className="focus:ring-2 focus:ring-blue-200 transition-all"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label className="flex items-center">
//               <Tag className="w-4 h-4 mr-2 text-blue-500" /> Categories
//             </Label>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   type="button"
//                   onClick={() => handleCategoryToggle(category)}
//                   className={`py-2 px-4 rounded-full text-sm transition-colors ${
//                     formData.prod_keywords.includes(category)
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
//           >
//             <ShoppingCart className="w-5 h-5" /> Add Product
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Package,
  Tag,
  Star,
  Percent,
  Image as ImageIcon,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

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

export default function AddProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prod_name: "",
    prod_image: "",
    prod_quantity: 0,
    prod_price: 0,
    rating_stars: 0,
    rating_count: 0,
    prod_discount: 0,
    prod_keywords: [] as string[],
  });
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Form data:", formData);
      const response = await fetch("http://localhost:5000/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        router.push("/admin");
        // Reset form
        setFormData({
          prod_name: "",
          prod_image: "",
          prod_quantity: 0,
          prod_price: 0,
          rating_stars: 0,
          rating_count: 0,
          prod_discount: 0,
          prod_keywords: [],
        });
      } else {
        setMessage({
          type: "error",
          content: data.message || "Failed to add product",
        });
      }
    } catch (error) {
      setMessage({ type: "error", content: "Error connecting to server" });
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      prod_keywords: prev.prod_keywords.includes(category)
        ? prev.prod_keywords.filter((k) => k !== category)
        : [...prev.prod_keywords, category],
    }));
  };

  const renderImagePreview = () => (
    <div className="col-span-2 mt-4">
      <Label className="text-sm font-medium text-gray-700">Image Preview</Label>
      <div className="mt-2 relative w-full h-[200px] rounded-xl overflow-hidden border border-gray-200">
        {formData.prod_image ? (
          <Image
            src={formData.prod_image}
            alt="Product preview"
            layout="fill"
            objectFit="contain"
            className="bg-white"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">
            No image URL provided
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-8 flex items-center">
          <Package className="w-10 h-10 mr-4" />
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {message.content && (
            <div
              className={`p-4 rounded-md flex items-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <ShoppingCart className="mr-2" />
              ) : null}
              {message.content}
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="prod_name" className="flex items-center text-gray-700">
              <Tag className="w-5 h-5 mr-2 text-blue-500" />
              Product Name
            </Label>
            <Input
              id="prod_name"
              value={formData.prod_name}
              onChange={(e) =>
                setFormData({ ...formData, prod_name: e.target.value })
              }
              className="focus:ring-2 focus:ring-blue-200 transition-all rounded-md"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="prod_image" className="flex items-center text-gray-700">
              <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
              Image URL
            </Label>
            <Input
              id="prod_image"
              value={formData.prod_image}
              onChange={(e) =>
                setFormData({ ...formData, prod_image: e.target.value })
              }
              className="focus:ring-2 focus:ring-blue-200 transition-all rounded-md"
              required
            />
          </div>

          {renderImagePreview()}

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="prod_quantity" className="flex items-center text-gray-700">
                <Package className="w-5 h-5 mr-2 text-blue-500" />
                Quantity
              </Label>
              <Input
                id="prod_quantity"
                type="number"
                value={formData.prod_quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prod_quantity: Number(e.target.value),
                  })
                }
                className="focus:ring-2 focus:ring-blue-200 transition-all rounded-md"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="prod_price" className="flex items-center text-gray-700">
                <Tag className="w-5 h-5 mr-2 text-blue-500" />
                Price
              </Label>
              <Input
                id="prod_price"
                type="number"
                step="0.01"
                value={formData.prod_price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prod_price: Number(e.target.value),
                  })
                }
                className="focus:ring-2 focus:ring-blue-200 transition-all rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="rating_stars" className="flex items-center text-gray-700">
                <Star className="w-5 h-5 mr-2 text-blue-500" />
                Rating Stars
              </Label>
              <Input
                id="rating_stars"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating_stars}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating_stars: Number(e.target.value),
                  })
                }
                className="focus:ring-2 focus:ring-blue-200 transition-all rounded-md"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="rating_count" className="flex items-center text-gray-700">
                <Star className="w-5 h-5 mr-2 text-blue-500" />
                Rating Count
              </Label>
              <Input
                id="rating_count"
                type="number"
                value={formData.rating_count}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating_count: Number(e.target.value),
                  })
                }
                className="focus:ring-2 focus:ring-blue-200 transition-all rounded-md"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="prod_discount" className="flex items-center text-gray-700">
                <Percent className="w-5 h-5 mr-2 text-blue-500" />
                Discount
              </Label>
              <Input
                id="prod_discount"
                type="number"
                step="0.01"
                value={formData.prod_discount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prod_discount: Number(e.target.value),
                  })
                }
                className="focus:ring-2 focus:ring-blue-200 transition-all rounded-md"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center text-gray-700">
              <Tag className="w-5 h-5 mr-2 text-blue-500" />
              Categories
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`py-3 px-5 rounded-full text-sm transition-colors ${
                    formData.prod_keywords.includes(category)
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-6 h-6" /> Add Product
          </Button>
        </form>
      </div>
    </div>
  );
}
