// 'use client';

// import { useState } from "react";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";

// export default function AddProductForm() {
//   const [formData, setFormData] = useState({
//     prod_name: "",
//     prod_image: "",
//     prod_quantity: 0,
//     prod_price: 0,
//     rating_stars: 0,
//     rating_count: 0,
//     prod_discount: 0,
//     prod_keywords: [] as string[]
//   });
//   const [keywords, setKeywords] = useState("");
//   const [message, setMessage] = useState({ type: "", content: "" });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/products/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           prod_keywords: keywords.split(",").map(k => k.trim())
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage({ type: "success", content: "Product added successfully!" });
//         // Reset form
//         setFormData({
//           prod_name: "",
//           prod_image: "",
//           prod_quantity: 0,
//           prod_price: 0,
//           rating_stars: 0,
//           rating_count: 0,
//           prod_discount: 0,
//           prod_keywords: []
//         });
//         setKeywords("");
//       } else {
//         setMessage({ type: "error", content: data.message || "Failed to add product" });
//       }
//     } catch (error) {
//       setMessage({ type: "error", content: "Error connecting to server" });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {message.content && (
//         <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//           {message.content}
//         </div>
//       )}

//       <div className="space-y-2">
//         <Label htmlFor="prod_name">Product Name</Label>
//         <Input
//           id="prod_name"
//           value={formData.prod_name}
//           onChange={(e) => setFormData({...formData, prod_name: e.target.value})}
//           required
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="prod_image">Image URL</Label>
//         <Input
//           id="prod_image"
//           value={formData.prod_image}
//           onChange={(e) => setFormData({...formData, prod_image: e.target.value})}
//           required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="prod_quantity">Quantity</Label>
//           <Input
//             id="prod_quantity"
//             type="number"
//             value={formData.prod_quantity}
//             onChange={(e) => setFormData({...formData, prod_quantity: Number(e.target.value)})}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="prod_price">Price</Label>
//           <Input
//             id="prod_price"
//             type="number"
//             step="0.01"
//             value={formData.prod_price}
//             onChange={(e) => setFormData({...formData, prod_price: Number(e.target.value)})}
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="rating_stars">Rating Stars</Label>
//           <Input
//             id="rating_stars"
//             type="number"
//             min="0"
//             max="5"
//             step="0.1"
//             value={formData.rating_stars}
//             onChange={(e) => setFormData({...formData, rating_stars: Number(e.target.value)})}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="rating_count">Rating Count</Label>
//           <Input
//             id="rating_count"
//             type="number"
//             value={formData.rating_count}
//             onChange={(e) => setFormData({...formData, rating_count: Number(e.target.value)})}
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="prod_discount">Discount</Label>
//           <Input
//             id="prod_discount"
//             type="number"
//             step="0.01"
//             value={formData.prod_discount}
//             onChange={(e) => setFormData({...formData, prod_discount: Number(e.target.value)})}
//             required
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="prod_keywords">Keywords (comma-separated)</Label>
//         <Textarea
//           id="prod_keywords"
//           value={keywords}
//           onChange={(e) => setKeywords(e.target.value)}
//           placeholder="Enter keywords separated by commas"
//           required
//         />
//       </div>

//       <Button type="submit" className="w-full">
//         Add Product
//       </Button>
//     </form>
//   );
// }




'use client';

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Package, Tag, Star, Percent, Image, ShoppingCart } from 'lucide-react';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    prod_name: "",
    prod_image: "",
    prod_quantity: 0,
    prod_price: 0,
    rating_stars: 0,
    rating_count: 0,
    prod_discount: 0,
    prod_keywords: [] as string[]
  });
  const [keywords, setKeywords] = useState("");
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
        body: JSON.stringify({
          ...formData,
          prod_keywords: keywords.split(",").map(k => k.trim())
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", content: "Product added successfully!" });
        // Reset form
        setFormData({
          prod_name: "",
          prod_image: "",
          prod_quantity: 0,
          prod_price: 0,
          rating_stars: 0,
          rating_count: 0,
          prod_discount: 0,
          prod_keywords: []
        });
        setKeywords("");
      } else {
        setMessage({ type: "error", content: data.message || "Failed to add product" });
      }
    } catch (error) {
      setMessage({ type: "error", content: "Error connecting to server" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
        <div className="bg-blue-500 text-white p-6 flex items-center">
          <Package className="w-8 h-8 mr-3" />
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message.content && (
            <div className={`p-4 rounded-md flex items-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.type === 'success' ? <ShoppingCart className="mr-2" /> : null}
              {message.content}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="prod_name" className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-blue-500" /> Product Name
            </Label>
            <Input
              id="prod_name"
              value={formData.prod_name}
              onChange={(e) => setFormData({...formData, prod_name: e.target.value})}
              className="focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prod_image" className="flex items-center">
              <Image className="w-4 h-4 mr-2 text-blue-500" /> Image URL
            </Label>
            <Input
              id="prod_image"
              value={formData.prod_image}
              onChange={(e) => setFormData({...formData, prod_image: e.target.value})}
              className="focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prod_quantity" className="flex items-center">
                <Package className="w-4 h-4 mr-2 text-blue-500" /> Quantity
              </Label>
              <Input
                id="prod_quantity"
                type="number"
                value={formData.prod_quantity}
                onChange={(e) => setFormData({...formData, prod_quantity: Number(e.target.value)})}
                className="focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prod_price" className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-blue-500" /> Price
              </Label>
              <Input
                id="prod_price"
                type="number"
                step="0.01"
                value={formData.prod_price}
                onChange={(e) => setFormData({...formData, prod_price: Number(e.target.value)})}
                className="focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating_stars" className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-blue-500" /> Rating Stars
              </Label>
              <Input
                id="rating_stars"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating_stars}
                onChange={(e) => setFormData({...formData, rating_stars: Number(e.target.value)})}
                className="focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating_count" className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-blue-500" /> Rating Count
              </Label>
              <Input
                id="rating_count"
                type="number"
                value={formData.rating_count}
                onChange={(e) => setFormData({...formData, rating_count: Number(e.target.value)})}
                className="focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prod_discount" className="flex items-center">
                <Percent className="w-4 h-4 mr-2 text-blue-500" /> Discount
              </Label>
              <Input
                id="prod_discount"
                type="number"
                step="0.01"
                value={formData.prod_discount}
                onChange={(e) => setFormData({...formData, prod_discount: Number(e.target.value)})}
                className="focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prod_keywords" className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-blue-500" /> Keywords (comma-separated)
            </Label>
            <Textarea
              id="prod_keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords separated by commas"
              className="focus:ring-2 focus:ring-blue-200 transition-all"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" /> Add Product
          </Button>
        </form>
      </div>
    </div>
  );
}