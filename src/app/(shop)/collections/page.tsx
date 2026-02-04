"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FadeIn,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const collections = [
  {
    name: "Summer Essentials",
    slug: "summer",
    description: "Light, breathable pieces perfect for warm days",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    productCount: 24,
    featured: true,
  },
  {
    name: "Formal Edit",
    slug: "formal",
    description: "Sophisticated styles for professional settings",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    productCount: 18,
    featured: true,
  },
  {
    name: "Street Style",
    slug: "streetwear",
    description: "Urban-inspired looks for the bold and trendy",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
    productCount: 32,
    featured: true,
  },
  {
    name: "Casual Comfort",
    slug: "casual",
    description: "Everyday essentials that don't compromise on style",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    productCount: 28,
    featured: false,
  },
  {
    name: "Athleisure",
    slug: "athleisure",
    description: "Where performance meets fashion",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    productCount: 20,
    featured: false,
  },
  {
    name: "Winter Warmers",
    slug: "winter",
    description: "Cozy layers to keep you stylish in the cold",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    productCount: 15,
    featured: false,
  },
  {
    name: "Ethnic Fusion",
    slug: "ethnic",
    description: "Traditional aesthetics with a modern twist",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    productCount: 22,
    featured: false,
  },
  {
    name: "Minimalist",
    slug: "minimalist",
    description: "Clean lines and timeless simplicity",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    productCount: 16,
    featured: false,
  },
];

export default function CollectionsPage() {
  const featuredCollections = collections.filter((c) => c.featured);
  const otherCollections = collections.filter((c) => !c.featured);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Curated for You</span>
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our Collections
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our thoughtfully curated collections, each designed to
              help you express your unique style.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Collections - Large Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ScrollReveal className="mb-8">
            <h2 className="font-display text-2xl font-bold">
              Featured Collections
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredCollections.map((collection, index) => (
              <ScrollReveal key={collection.slug} delay={index * 0.1}>
                <Link
                  href={`/products?category=${collection.slug}`}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="inline-block bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full mb-3">
                            {collection.productCount} Products
                          </span>
                          <h3 className="text-2xl font-bold mb-2">
                            {collection.name}
                          </h3>
                          <p className="text-white/80 text-sm mb-4">
                            {collection.description}
                          </p>
                          <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                            Explore Collection
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </motion.div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="mb-8">
            <h2 className="font-display text-2xl font-bold">All Collections</h2>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCollections.map((collection) => (
              <StaggerItem key={collection.slug}>
                <Link
                  href={`/products?category=${collection.slug}`}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {collection.name}
                          </h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {collection.productCount}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {collection.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our complete catalog with over 200+ products across all
              categories.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
