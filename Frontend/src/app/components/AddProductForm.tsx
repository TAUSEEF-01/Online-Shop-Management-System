'use client';

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {message.content && (
        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.content}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="prod_name">Product Name</Label>
        <Input
          id="prod_name"
          value={formData.prod_name}
          onChange={(e) => setFormData({...formData, prod_name: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="prod_image">Image URL</Label>
        <Input
          id="prod_image"
          value={formData.prod_image}
          onChange={(e) => setFormData({...formData, prod_image: e.target.value})}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prod_quantity">Quantity</Label>
          <Input
            id="prod_quantity"
            type="number"
            value={formData.prod_quantity}
            onChange={(e) => setFormData({...formData, prod_quantity: Number(e.target.value)})}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prod_price">Price</Label>
          <Input
            id="prod_price"
            type="number"
            step="0.01"
            value={formData.prod_price}
            onChange={(e) => setFormData({...formData, prod_price: Number(e.target.value)})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rating_stars">Rating Stars</Label>
          <Input
            id="rating_stars"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating_stars}
            onChange={(e) => setFormData({...formData, rating_stars: Number(e.target.value)})}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating_count">Rating Count</Label>
          <Input
            id="rating_count"
            type="number"
            value={formData.rating_count}
            onChange={(e) => setFormData({...formData, rating_count: Number(e.target.value)})}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prod_discount">Discount</Label>
          <Input
            id="prod_discount"
            type="number"
            step="0.01"
            value={formData.prod_discount}
            onChange={(e) => setFormData({...formData, prod_discount: Number(e.target.value)})}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prod_keywords">Keywords (comma-separated)</Label>
        <Textarea
          id="prod_keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Enter keywords separated by commas"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
}
