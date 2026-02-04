"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn, ScrollReveal } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/hooks/use-cart";
import { useWishlistStore } from "@/hooks/use-wishlist";

export default function WishlistPage() {
  const { items: wishlist, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const addToCart = (item: (typeof wishlist)[0]) => {
    addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "M",
      color: "Default",
      quantity: 1,
      stock: 10, // Default stock for wishlist items
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-28">
        <FadeIn className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-flex p-6 rounded-full bg-muted mb-6"
          >
            <Heart className="h-16 w-16 text-muted-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">
            Save items you love for later
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/products">
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlist.length} saved items
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, height: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-product overflow-hidden">
                    <Link href={`/products/${item.slug}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>

                    {/* Remove button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.productId)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>

                    {/* Out of stock overlay */}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-bold text-lg mt-1">
                      {formatCurrency(item.price)}
                    </p>

                    {/* Add to Cart button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4"
                    >
                      <Button
                        className="w-full gap-2"
                        disabled={!item.inStock}
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {item.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Recommendations */}
        <ScrollReveal className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Tailored Chinos",
                price: 2799,
                image:
                  "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
              },
              {
                name: "Merino Wool Sweater",
                price: 3499,
                image:
                  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
              },
            ].map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-product overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="font-bold">{formatCurrency(product.price)}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
