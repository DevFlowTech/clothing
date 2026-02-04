"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="relative"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 select-none">
            404
          </h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-background px-6 py-3 rounded-full border shadow-lg">
              <p className="text-lg font-semibold">Page Not Found</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-4"
        >
          <p className="text-muted-foreground max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have wandered off.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button className="gap-2" asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="secondary" className="gap-2" asChild>
              <Link href="/products">
                <Search className="h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
