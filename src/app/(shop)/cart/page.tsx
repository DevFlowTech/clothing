"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ArrowLeft,
  Bookmark,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/hooks/use-cart";
import { useSavedForLaterStore } from "@/hooks/use-saved-for-later";
import { FadeIn, ScrollReveal } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getItemCount,
    addItem,
  } = useCartStore();
  const {
    items: savedItems,
    addItem: saveForLater,
    removeItem: removeSaved,
    getItemCount: getSavedCount,
  } = useSavedForLaterStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const total = getSubtotal();
  const itemCount = getItemCount();
  const savedCount = getSavedCount();
  const shipping = total > 2000 ? 0 : 99;
  const discount = couponApplied ? total * 0.1 : 0;
  const finalTotal = total + shipping - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "DEVFLOW10") {
      setCouponApplied(true);
      toast.success("Coupon applied successfully!", {
        description: "You saved 10% on your order",
      });
    } else {
      toast.error("Invalid coupon code", {
        description: "Please check and try again",
      });
    }
  };

  const handleRemoveItem = (
    productId: string,
    size: string,
    color: string,
    name: string,
  ) => {
    removeItem(productId, size, color);
    toast.success("Item removed from cart", {
      description: name,
    });
  };

  const handleSaveForLater = (item: (typeof items)[0]) => {
    saveForLater({
      productId: `${item.productId}-${item.size}-${item.color}`,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
      color: item.color,
      stock: item.stock,
    });
    removeItem(item.productId, item.size, item.color);
    toast.success("Saved for later", {
      description: item.name,
    });
  };

  const handleMoveToCart = (savedItem: (typeof savedItems)[0]) => {
    addItem({
      productId: savedItem.productId.split("-")[0],
      name: savedItem.name,
      price: savedItem.price,
      image: savedItem.image,
      size: savedItem.size,
      color: savedItem.color,
      quantity: 1,
      stock: savedItem.stock,
    });
    removeSaved(savedItem.productId);
    toast.success("Moved to cart", {
      description: savedItem.name,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <FadeIn className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="inline-flex p-6 rounded-full bg-muted mb-6"
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added any items yet
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/products">
              Start Shopping
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
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/products">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">{itemCount} items</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div>
                            <h3 className="font-semibold line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} • Color: {item.color}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleRemoveItem(
                                item.productId,
                                item.size,
                                item.color,
                                item.name,
                              )
                            }
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>

                        <div className="space-y-3 mt-4">
                          {/* Stock Warning */}
                          {item.stock > 0 && item.stock < 10 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 text-xs bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded px-2 py-1.5"
                            >
                              <AlertTriangle className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                              <span className="text-orange-900 dark:text-orange-100 font-medium">
                                Only {item.stock} left in stock!
                              </span>
                            </motion.div>
                          )}
                          {item.stock === 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 text-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded px-2 py-1.5"
                            >
                              <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                              <span className="text-red-900 dark:text-red-100 font-medium">
                                Out of stock
                              </span>
                            </motion.div>
                          )}

                          <div className="flex items-end justify-between">
                            {/* Quantity */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.size,
                                      item.color,
                                      Math.max(1, item.quantity - 1),
                                    )
                                  }
                                  className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </motion.button>
                                <span className="w-8 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.size,
                                      item.color,
                                      item.quantity + 1,
                                    )
                                  }
                                  disabled={
                                    item.quantity >= item.stock ||
                                    item.stock === 0
                                  }
                                  className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                                >
                                  <Plus className="h-3 w-3" />
                                </motion.button>
                              </div>
                            </div>

                            {/* Price */}
                            <p className="font-bold">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>

                          {/* Save for Later Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSaveForLater(item)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Bookmark className="h-3.5 w-3.5" />
                            Save for later
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <ScrollReveal>
              <Card className="p-6 sticky top-28">
                <h2 className="font-bold text-lg mb-6">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={couponApplied}
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {couponApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-green-600 mt-2"
                    >
                      ✓ Coupon DEVFLOW10 applied - 10% off
                    </motion.p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: DEVFLOW10 for 10% off
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatCurrency(shipping)}
                    </span>
                  </div>
                  {couponApplied && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between text-sm text-green-600"
                    >
                      <span>Discount</span>
                      <span>-{formatCurrency(discount)}</span>
                    </motion.div>
                  )}
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.div
                  whileHover={{
                    scale: items.some((item) => item.stock === 0) ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: items.some((item) => item.stock === 0) ? 1 : 0.98,
                  }}
                  className="mt-6"
                >
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    asChild={!items.some((item) => item.stock === 0)}
                    disabled={items.some((item) => item.stock === 0)}
                  >
                    {items.some((item) => item.stock === 0) ? (
                      "Remove out of stock items"
                    ) : (
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </Button>
                  {items.some((item) => item.stock === 0) && (
                    <p className="text-xs text-red-500 text-center mt-2 font-medium">
                      One or more items are out of stock.
                    </p>
                  )}
                </motion.div>

                {shipping === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-center text-green-600 mt-4"
                  >
                    ✓ You qualify for free shipping!
                  </motion.p>
                )}
              </Card>
            </ScrollReveal>
          </div>
        </div>

        {/* Saved for Later Section */}
        {savedCount > 0 && (
          <ScrollReveal className="mt-12">
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">
                Saved for Later ({savedCount})
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {savedItems.map((item, index) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-4">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold line-clamp-1 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Size: {item.size} • Color: {item.color}
                          </p>
                          <p className="font-bold mb-3">
                            {formatCurrency(item.price)}
                          </p>
                          {item.stock > 0 && item.stock < 10 && (
                            <p className="text-xs text-orange-600 dark:text-orange-400 mb-2">
                              Only {item.stock} left!
                            </p>
                          )}
                          {item.stock === 0 && (
                            <p className="text-xs text-red-600 dark:text-red-400 mb-2">
                              Out of stock
                            </p>
                          )}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleMoveToCart(item)}
                              disabled={item.stock === 0}
                              className="flex-1"
                            >
                              Move to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                removeSaved(item.productId);
                                toast.success("Item removed");
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
