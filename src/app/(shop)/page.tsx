"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight, Star, ArrowDownRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const products = [
  {
    id: 1,
    name: "Oversized Bomber",
    price: "₹12,400",
    tag: "NEW DROP",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
  },
  {
    id: 2,
    name: "Cargo Pants V2",
    price: "₹6,800",
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000",
  },
  {
    id: 3,
    name: "Graphic Tee 004",
    price: "₹2,500",
    tag: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
  },
  {
    id: 4,
    name: "Combat Boots",
    price: "₹15,000",
    tag: "RARE",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
  },
];

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen text-foreground font-mono">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col border-b-2 border-black">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
          {/* Text Area */}
          <div className="lg:col-span-7 flex flex-col justify-center p-6 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-white relative overflow-hidden">
            <div className="relative z-10 p-4">
              <span className="inline-block text-sm font-bold tracking-widest mb-6 text-gray-500 uppercase">
                FW / 2026 Collection
              </span>
              <h1 className="text-7xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-8 uppercase text-black font-sans">
                Street
                <br />
                Wear
                <br />
                Re:Defined
              </h1>
              <p className="max-w-md text-xl font-medium mb-10 text-gray-800 leading-relaxed">
                Raw fabrics. Industrial design. No compromises. The new standard
                in urban armor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="xl" variant="default" asChild>
                  <Link href="/products">
                    Shop The Drop <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href="/collections">
                    Lookbook <ArrowDownRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Image Area */}
          <div className="lg:col-span-5 relative bg-black group overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200"
              alt="Hero"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.3)_50%,transparent_75%)] bg-[length:4px_4px]" />
            <div className="absolute bottom-8 right-8">
              <div className="bg-white border-2 border-black p-4 shadow-hard text-black animate-bounce">
                <p className="font-bold text-xl">SCROLL DOWN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-accent border-t-2 border-black overflow-hidden py-3">
          <div className="animate-marquee whitespace-nowrap flex gap-12 font-black text-2xl uppercase">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="flex items-center gap-4">
                Global Shipping <Star className="fill-black h-6 w-6" /> Limited
                Stock <Star className="fill-black h-6 w-6" /> New Arrivals
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b-2 border-black">
        {[
          {
            name: "TOPS",
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
          },
          {
            name: "BOTTOMS",
            image:
              "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000",
          },
          {
            name: "ACCESSORIES",
            image:
              "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1000",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="h-[400px] relative border-b-2 md:border-b-0 md:border-r-2 border-black last:border-r-0 group cursor-pointer overflow-hidden bg-gray-100"
          >
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <h2 className="font-sans text-5xl font-black text-white mix-blend-difference group-hover:scale-110 transition-transform duration-500 uppercase tracking-tighter">
                {item.name}
              </h2>
            </div>
            <div className="absolute bottom-6 left-6 z-30">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                asChild
              >
                <Link
                  href={`/products?category=${
                    item.name === "TOPS"
                      ? "t-shirts"
                      : item.name === "BOTTOMS"
                        ? "pants"
                        : item.name.toLowerCase()
                  }`}
                >
                  EXPLORE
                </Link>
              </Button>
            </div>
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          </div>
        ))}
      </section>

      {/* PRODUCT LIST */}
      <section className="p-0 border-b-2 border-black">
        <div className="py-12 px-6 flex justify-between items-end border-b-2 border-black bg-white">
          <h2 className="font-display text-5xl font-black uppercase">
            Fresh Gear
          </h2>
          <Link
            href="/products"
            className="font-bold text-xl underline decoration-4 decoration-accent underline-offset-4 hover:bg-black hover:text-white transition-colors p-2"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="group border-b-2 lg:border-b-0 border-r-2 border-black p-4 hover:bg-accent/10 transition-colors relative"
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black text-white text-xs font-bold px-2 py-1">
                  {p.tag}
                </span>
              </div>

              <div className="aspect-[4/5] relative border-2 border-black mb-4 overflow-hidden bg-white">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0"
                />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg uppercase truncate pr-4">
                    {p.name}
                  </h3>
                  <p className="text-muted-foreground font-mono">{p.price}</p>
                </div>
                <Button
                  size="icon"
                  variant="default"
                  className="h-10 w-10 shrink-0"
                  asChild
                >
                  <Link href={`/products/product-${p.id}`}>
                    <MoveRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO / ABOUT */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-accent p-12 lg:p-24 border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-center">
          <h2 className="font-display text-6xl font-black mb-6">
            WE BREAK
            <br />
            THE RULES.
          </h2>
          <p className="text-xl font-bold mb-8">
            DevFlow Clothing isn&apos;t just a brand. It&apos;s a statement.
            Against the mundane. Against the soft. We build gear for the
            concrete jungle.
          </p>
          <Button
            variant="outline"
            size="xl"
            className="w-fit bg-white text-black shadow-hard border-4"
            asChild
          >
            <Link href="/about">READ OUR STORY</Link>
          </Button>
        </div>
        <div className="min-h-[500px] relative bg-zinc-900 flex items-center justify-center">
          <div className="text-white text-center p-8 border-4 border-white">
            <p className="font-mono text-xl animate-pulse">
              EST. 2026 // TOKYO - NY - LONDON
            </p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=1200"
            alt="About"
            fill
            className="object-cover mix-blend-overlay opacity-50"
          />
        </div>
      </section>
    </div>
  );
}
