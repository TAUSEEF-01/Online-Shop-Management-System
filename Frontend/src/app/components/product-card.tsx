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
      <Card className="h-[32rem] flex flex-col">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 w-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform hover:scale-105"
            />
          </div>
          <Button
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-md p-2 rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            <Eye className="h-5 w-5 text-gray-700" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <CardTitle className="text-lg mb-2 line-clamp-2 h-14">
            {product.name}
          </CardTitle>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating.stars)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.count} reviews
            </span>
          </div>
          <p className="text-2xl font-bold mb-2">
            {formatPrice(product.priceCents)}
          </p>
          <div className="flex flex-wrap gap-1 mb-2 max-h-20 overflow-y-auto">
            {product.keywords.map((keyword, index) => (
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
          <Button className="w-full" onClick={addToCart} disabled={isLoading}>
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
