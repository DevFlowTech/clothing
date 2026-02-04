"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { useCompareStore } from "@/hooks/use-compare";
import { useCartStore } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export function CompareDrawer() {
  const { items, removeItem, clearCompare, isOpen, setIsOpen } =
    useCompareStore();
  const { addItem } = useCartStore();

  if (items.length === 0) return null;

  const handleAddToCart = (product: (typeof items)[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "M", // Default size, user should ideally select
      color: "Default",
      quantity: 1,
      stock: product.stock,
    });
    toast.success("Added to cart");
  };

  return (
    <>
      <AnimatePresence>
        {items.length > 0 && !isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 right-4 z-40"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="shadow-lg brutal-border"
              size="lg"
            >
              Compare ({items.length})
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Compare Products</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCompare}
              className="mr-8"
            >
              Clear All
            </Button>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {items.map((product) => (
              <div
                key={product.id}
                className="relative border p-4 rounded-lg space-y-4"
              >
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative aspect-square bg-muted rounded-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                </div>

                <div className="text-lg font-bold">
                  {formatCurrency(product.price)}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-muted-foreground">Availability</span>
                    <span
                      className={
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  {/* Add more comparison fields here if available */}
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full gap-2"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="link" className="w-full mt-2" asChild>
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}

            {items.length < 4 && (
              <div className="border border-dashed rounded-lg flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-muted/50">
                <p>Add more products to compare</p>
                <Button variant="link" onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
