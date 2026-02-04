"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useRecentlyViewedStore } from "@/hooks/use-recently-viewed";
import { formatCurrency } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion";

export function RecentlyViewed() {
  const { products } = useRecentlyViewedStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || products.length === 0) {
    return null;
  }

  return (
    <ScrollReveal className="py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Eye className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Recently Viewed</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-medium text-sm line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="font-bold text-sm">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
