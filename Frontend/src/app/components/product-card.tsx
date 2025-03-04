import Image from "next/image";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useState } from "react";
import { api } from "@/utils/api";
import ImageModal from "./ImageModal";

interface Rating {
  stars: number;
  count: number;
}

interface Product {
  id: string;
  image: string;
  name: string;
  rating: Rating;
  priceCents: number;
  keywords: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = async () => {
    setIsLoading(true);
    try {
      const userId = await api.getCurrentUserId();
      console.log("Adding product to cart:", product.id, "for user:", userId);
      const result = await api.addToCart(Number(product.id), userId);
      console.log("Cart response:", result);
      alert("Added to cart successfully!");
    } catch (error: any) {
      alert("Item has already been added to your cart.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <>
      <Card className="h-[32rem] flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white rounded-lg overflow-hidden">
        <CardHeader className="p-0 relative group">
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </div>
          <Button
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            onClick={() => setIsModalOpen(true)}
          >
            <Eye className="h-5 w-5 text-gray-700" />
          </Button>
        </CardHeader>

        <CardContent className="p-6 flex-1">
          <CardTitle className="text-lg font-semibold mb-3 line-clamp-2 h-14 text-gray-800">
            {product.name}
          </CardTitle>

          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating.stars)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-200"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({product.rating.count})
            </span>
          </div>

          <p className="text-2xl font-bold mb-3 text-blue-600">
            {formatPrice(product.priceCents)}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            {product.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-full transition-all duration-300 transform hover:shadow-lg disabled:opacity-50"
            onClick={addToCart}
            disabled={isLoading}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={product.image}
        imageAlt={product.name}
      />
    </>
  );
}
