"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/hooks/use-cart";
import { useWishlistStore } from "@/hooks/use-wishlist";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import { toast } from "sonner";

interface QuickViewModalProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    image: string;
    images?: string[];
    category: string;
    colors: string[];
    stock: number;
    description?: string;
  };
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({
  product,
  open,
  onClose,
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();

  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.id,
  );

  const images = product.images || [product.image];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      stock: product.stock,
    });

    toast.success("Added to cart!", {
      description: `${product.name} - ${selectedSize}, ${selectedColor}`,
    });
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        inStock: product.stock > 0,
      });
      toast.success("Added to wishlist!", {
        description: product.name,
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-muted">
            <div className="aspect-square relative">
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.comparePrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  {calculateDiscountPercentage(
                    product.price,
                    product.comparePrice,
                  )}
                  % OFF
                </Badge>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                  Only {product.stock} left!
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <DialogTitle className="text-2xl font-bold">
                    {product.name}
                  </DialogTitle>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.0 (128 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">
                {formatCurrency(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatCurrency(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-muted-foreground mb-6">
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold">Size</label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium border-2 rounded transition-colors ${
                      selectedSize === size
                        ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                        : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="text-sm font-semibold mb-3 block">
                Color: {selectedColor}
              </label>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm border-2 rounded transition-colors ${
                      selectedColor === color
                        ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                        : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 gap-2"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Heart
                  className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            {/* View Full Details */}
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-center text-sm font-medium hover:underline mb-6"
            >
              View Full Details →
            </Link>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Free shipping on orders over ₹2000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span>Easy 30-day returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>1-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
