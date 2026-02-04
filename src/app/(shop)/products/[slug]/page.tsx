"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Star,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeIn, ScrollReveal } from "@/components/motion";
import { useCartStore } from "@/hooks/use-cart";
import { useWishlistStore } from "@/hooks/use-wishlist";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Ruler } from "lucide-react";

import { useRecentlyViewedStore } from "@/hooks/use-recently-viewed";
import { SizeGuideModal } from "@/components/shared/size-guide-modal";
import { RecentlyViewed } from "@/components/shared/recently-viewed";
import { products } from "../page";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const currentProduct = products.find((p) => p.slug === unwrappedParams.slug);

  // Use currentProduct or fallback to the mock if needed (but ideally show 404)
  const productData = currentProduct || products[0];

  const { addProduct } = useRecentlyViewedStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Track recently viewed
  useEffect(() => {
    if (productData) {
      addProduct({
        id: productData.id,
        name: productData.name,
        slug: productData.slug,
        price: productData.price,
        image: Array.isArray(productData.image)
          ? productData.image[0]
          : productData.image,
        category: productData.category,
      });
    }
  }, [productData, addProduct]);

  // Mapping the simple colors array from products to the detailed hex format for the UI
  const productColors = (productData.colors || []).map((c) => ({
    name: c,
    hex:
      c === "Black"
        ? "#000000"
        : c === "White"
          ? "#FFFFFF"
          : c === "Navy"
            ? "#1E3A5F"
            : "#888888",
  }));

  const [selectedColor, setSelectedColor] = useState(
    productColors[0] || { name: "Default", hex: "#888888" },
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(productData.id);

  const discount = productData.comparePrice
    ? calculateDiscountPercentage(productData.comparePrice, productData.price)
    : 0;

  const images = Array.isArray(productData.image)
    ? productData.image
    : [productData.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        description: "Choose your size before adding to cart",
      });
      return;
    }

    addItem({
      productId: productData.id,
      name: productData.name,
      price: productData.price,
      image: images[0],
      size: selectedSize,
      color: selectedColor.name,
      quantity,
      stock: productData.stock || 0,
    });

    toast.success("Added to cart!", {
      description: `${productData.name} (${selectedSize}, ${selectedColor.name})`,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleItem({
      productId: productData.id,
      name: productData.name,
      price: productData.price,
      image: images[0],
      slug: productData.slug,
      inStock: (productData.stock || 0) > 0,
    });

    if (isWishlisted) {
      toast.success("Removed from wishlist", {
        description: productData.name,
      });
    } else {
      toast.success("Added to wishlist!", {
        description: productData.name,
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
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <FadeIn className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${productData.category.toLowerCase()}`}
              className="hover:text-foreground transition-colors"
            >
              {productData.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{productData.name}</span>
          </nav>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImageIndex]}
                      alt={productData.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev + 1) % images.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discount > 0 && (
                    <Badge variant="destructive" className="text-sm">
                      -{discount}% OFF
                    </Badge>
                  )}
                </div>

                {/* Wishlist & Share */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={handleToggleWishlist}
                    className={cn(
                      "p-2 rounded-full transition-all",
                      isWishlisted
                        ? "bg-red-500 text-white"
                        : "bg-white/80 backdrop-blur-sm hover:bg-white",
                    )}
                  >
                    <Heart
                      className={cn("h-5 w-5", isWishlisted && "fill-current")}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {
                  images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "relative aspect-square rounded-lg overflow-hidden ring-2 transition-all",
                        currentImageIndex === index
                          ? "ring-primary"
                          : "ring-transparent hover:ring-primary/50",
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${productData.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  )) as any
                }
              </div>
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn delay={0.2}>
            <div className="sticky top-24">
              <div className="space-y-6">
                {/* Category & Reviews */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{productData.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground">(124 reviews)</span>
                  </div>
                </div>

                {/* Title & Price */}
                <div>
                  <h1 className="font-display text-3xl font-bold mb-3">
                    {productData.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">
                      {formatCurrency(productData.price)}
                    </span>
                    {productData.comparePrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        {formatCurrency(productData.comparePrice)}
                      </span>
                    )}
                    {discount > 0 && (
                      <Badge variant="success" className="text-sm">
                        Save{" "}
                        {formatCurrency(
                          productData.comparePrice! - productData.price,
                        )}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  Crafted from high-quality materials, this {productData.name}{" "}
                  offers exceptional style and durability. Perfect for any
                  occasion.
                </p>

                {/* Color Selector */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Color:{" "}
                    <span className="font-normal">{selectedColor.name}</span>
                  </label>
                  <div className="flex gap-3">
                    {
                      productColors.map((color: any) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "relative h-10 w-10 rounded-full border-2 transition-all",
                            selectedColor.name === color.name
                              ? "border-primary ring-2 ring-primary ring-offset-2"
                              : "border-transparent hover:scale-110",
                          )}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColor.name === color.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <Check
                                className={cn(
                                  "h-5 w-5",
                                  color.hex === "#FFFFFF"
                                    ? "text-black"
                                    : "text-white",
                                )}
                              />
                            </motion.div>
                          )}
                        </button>
                      )) as any
                    }
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Select Size</label>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:underline transition-all"
                    >
                      <Ruler className="h-3.5 w-3.5" />
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {
                      ["XS", "S", "M", "L", "XL", "XXL"].map((size: string) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "py-3 rounded-lg border text-sm font-medium transition-all brutal-border",
                            selectedSize === size
                              ? "bg-[#00FF00] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                              : "border-input bg-zinc-900 text-white hover:border-white",
                          )}
                        >
                          {size}
                        </button>
                      )) as any
                    }
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-muted transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(
                            Math.min(productData.stock || 1, quantity + 1),
                          )
                        }
                        className="p-3 hover:bg-muted transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {productData.stock || 0} items in stock
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex gap-3">
                  <Button
                    size="xl"
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                    disabled={!selectedSize || productData.stock === 0}
                  >
                    <AnimatePresence mode="wait">
                      {productData.stock === 0 ? (
                        <motion.span
                          key="out-of-stock"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          Out of Stock
                        </motion.span>
                      ) : addedToCart ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-5 w-5" />
                          Added to Cart!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {selectedSize ? "Add to Cart" : "Select a Size"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={() =>
                      toggleItem({
                        productId: productData.id,
                        name: productData.name,
                        price: productData.price,
                        image: images[0],
                        slug: productData.slug,
                        inStock: (productData.stock || 0) > 0,
                      })
                    }
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5",
                        isWishlisted && "fill-red-500 text-red-500",
                      )}
                    />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Free Shipping
                    </p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      15 Days Return
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Secure Checkout
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="pt-6 border-t font-sans">
                  <h3 className="font-medium mb-3">Product Details</h3>
                  <ul className="space-y-2">
                    {
                      [
                        "Premium Quality",
                        "Authentic Design",
                        "Ethically Made",
                      ].map((feature: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      )) as any
                    }
                  </ul>
                </div>

                <p className="text-xs text-muted-foreground">
                  SKU: {productData.id.padStart(6, "0")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold mb-8">
              You May Also Like
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
              products.slice(0, 4).map((relatedProduct: any, index: number) => (
                <ScrollReveal key={relatedProduct.id} delay={index * 0.1}>
                  <Link
                    href={`/products/${relatedProduct.slug}`}
                    className="group block"
                  >
                    <Card hover className="overflow-hidden">
                      <div className="relative aspect-product overflow-hidden">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          {relatedProduct.category}
                        </p>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="mt-1 font-semibold">
                          {formatCurrency(relatedProduct.price)}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </ScrollReveal>
              )) as any
            }
          </div>
        </section>

        {/* Recently Viewed */}
        <RecentlyViewed />

        <SizeGuideModal
          open={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
        />
      </div>
    </div>
  );
}
