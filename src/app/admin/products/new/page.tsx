"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, X, Save, Eye, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FadeIn, ScrollReveal } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

const categories = [
  "T-Shirts",
  "Shirts",
  "Jackets",
  "Sweaters",
  "Pants",
  "Jeans",
  "Accessories",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1E3A5F" },
  { name: "Grey", hex: "#6B7280" },
  { name: "Beige", hex: "#D4C4A8" },
  { name: "Brown", hex: "#8B5A2B" },
];

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "",
    category: "",
    status: "DRAFT",
    featured: false,
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
  });

  const handleImageUpload = () => {
    // In production, this would handle actual file uploads
    // For demo, we'll add a placeholder image
    const demoImages = [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
    ];
    const randomImage =
      demoImages[Math.floor(Math.random() * demoImages.length)];
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, randomImage],
    }));
  };

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const toggleSize = (size: string) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (colorName: string) => {
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter((c) => c !== colorName)
        : [...prev.colors, colorName],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, this would save to the database
    console.log("Product data:", product);

    setIsSubmitting(false);
    router.push("/admin/products");
  };

  const calculatedPrice = product.price ? parseFloat(product.price) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground">
              Create a new product for your store
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            className="gap-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </FadeIn>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Product Name *
                    </label>
                    <Input
                      placeholder="e.g., Premium Cotton T-Shirt"
                      value={product.name}
                      onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Description
                    </label>
                    <textarea
                      className="w-full min-h-[120px] px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Describe your product..."
                      value={product.description}
                      onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Media */}
            <ScrollReveal delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
                      >
                        <Image
                          src={image}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2">
                            Main
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleImageUpload}
                      className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                    >
                      <ImageIcon className="h-8 w-8" />
                      <span className="text-sm">Add Image</span>
                    </motion.button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Recommended: 1:1 ratio, at least 800x800px. First image will
                    be the main product image.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Pricing */}
            <ScrollReveal delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Price (₹) *
                      </label>
                      <Input
                        type="number"
                        placeholder="1999"
                        value={product.price}
                        onChange={(e) =>
                          setProduct({ ...product, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Compare at Price (₹)
                      </label>
                      <Input
                        type="number"
                        placeholder="2499"
                        value={product.comparePrice}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            comparePrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        SKU
                      </label>
                      <Input
                        placeholder="PCT-001"
                        value={product.sku}
                        onChange={(e) =>
                          setProduct({ ...product, sku: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Stock Quantity *
                      </label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={product.stock}
                        onChange={(e) =>
                          setProduct({ ...product, stock: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Variants */}
            <ScrollReveal delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Sizes */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <motion.button
                          key={size}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSize(size)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            product.sizes.includes(size)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "hover:border-primary/50"
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Available Colors
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {colors.map((color) => (
                        <motion.button
                          key={color.name}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleColor(color.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                            product.colors.includes(color.name)
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border"
                            style={{ backgroundColor: color.hex }}
                          />
                          {color.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status */}
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={product.status}
                    onValueChange={(value) =>
                      setProduct({ ...product, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Featured Product</p>
                      <p className="text-sm text-muted-foreground">
                        Show on homepage
                      </p>
                    </div>
                    <Switch
                      checked={product.featured}
                      onCheckedChange={(checked) =>
                        setProduct({ ...product, featured: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Category */}
            <ScrollReveal delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  <label className="text-sm font-medium mb-2 block">
                    Category *
                  </label>
                  <Select
                    value={product.category}
                    onValueChange={(value) =>
                      setProduct({ ...product, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Preview */}
            <ScrollReveal delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4">
                    {product.images[0] ? (
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                        <Image
                          src={product.images[0]}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square rounded-lg bg-muted flex items-center justify-center mb-4">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <h3 className="font-semibold line-clamp-1">
                      {product.name || "Product Name"}
                    </h3>
                    <p className="text-lg font-bold mt-1">
                      {calculatedPrice > 0
                        ? formatCurrency(calculatedPrice)
                        : "₹0"}
                    </p>
                    {product.sizes.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {product.sizes.slice(0, 4).map((size) => (
                          <span
                            key={size}
                            className="text-xs px-2 py-0.5 bg-muted rounded"
                          >
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-xs text-muted-foreground">
                            +{product.sizes.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </form>
    </div>
  );
}
