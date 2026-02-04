"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
// import { Metadata } from "next"; // Metadata cannot be used in client components
import {
  Filter,
  Grid,
  LayoutGrid,
  ChevronDown,
  Eye,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/motion";
import { formatCurrency, calculateDiscountPercentage, cn } from "@/lib/utils";
import { QuickViewModal } from "@/components/shared/quick-view-modal";
import { RecentlyViewed } from "@/components/shared/recently-viewed";
import { useCompareStore } from "@/hooks/use-compare";
import { toast } from "sonner";

// Mock products data
export const products = [
  // exported at top
  {
    id: "1",
    name: "Premium Cotton Tee",
    slug: "premium-cotton-tee",
    price: 1499,
    comparePrice: 1999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "T-Shirts",
    colors: ["Black", "White", "Navy"],
    stock: 45,
    featured: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    price: 3999,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Jackets",
    colors: ["Blue", "Black"],
    stock: 12,
    featured: true,
    isNew: false,
  },
  {
    id: "3",
    name: "Silk Blend Shirt",
    slug: "silk-blend-shirt",
    price: 2499,
    comparePrice: 2999,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    category: "Shirts",
    colors: ["White", "Beige"],
    stock: 0,
    featured: false,
    isNew: true,
  },
  {
    id: "4",
    name: "Tailored Chinos",
    slug: "tailored-chinos",
    price: 2799,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    category: "Pants",
    colors: ["Khaki", "Navy", "Olive"],
    stock: 28,
    featured: false,
    isNew: false,
  },
  {
    id: "5",
    name: "Merino Wool Sweater",
    slug: "merino-wool-sweater",
    price: 3499,
    comparePrice: 4499,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    category: "Sweaters",
    colors: ["Grey", "Navy", "Burgundy"],
    stock: 8,
    featured: true,
    isNew: false,
  },
  {
    id: "6",
    name: "Linen Summer Shirt",
    slug: "linen-summer-shirt",
    price: 1999,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    category: "Shirts",
    colors: ["White", "Blue", "Pink"],
    stock: 35,
    featured: false,
    isNew: true,
  },
  {
    id: "7",
    name: "Leather Belt",
    slug: "leather-belt",
    price: 1299,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    category: "Accessories",
    colors: ["Brown", "Black"],
    stock: 50,
    featured: false,
    isNew: false,
  },
  {
    id: "8",
    name: "Cashmere Scarf",
    slug: "cashmere-scarf",
    price: 2199,
    comparePrice: 2799,
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
    category: "Accessories",
    colors: ["Grey", "Camel", "Black"],
    stock: 15,
    featured: true,
    isNew: false,
  },
  // Adding 20 more T-Shirts
  {
    id: "9",
    name: "Graphic Street Tee",
    slug: "graphic-street-tee",
    price: 1299,
    comparePrice: 1599,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    category: "T-Shirts",
    colors: ["Black", "Grey"],
    stock: 20,
    featured: true,
    isNew: true,
  },
  {
    id: "10",
    name: "Minimalist V-Neck",
    slug: "minimalist-v-neck",
    price: 999,
    comparePrice: 1299,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    category: "T-Shirts",
    colors: ["White", "Black", "Charcoal"],
    stock: 100,
    featured: false,
    isNew: false,
  },
  {
    id: "11",
    name: "Vintage Wash Tee",
    slug: "vintage-wash-tee",
    price: 1799,
    comparePrice: 2299,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    category: "T-Shirts",
    colors: ["Dusty Blue", "Faded Grey"],
    stock: 12,
    featured: true,
    isNew: true,
  },
  {
    id: "12",
    name: "Heavyweight Boxy Tee",
    slug: "heavyweight-boxy-tee",
    price: 1999,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
    category: "T-Shirts",
    colors: ["Off-White", "Sage", "Black"],
    stock: 40,
    featured: true,
    isNew: true,
  },
  {
    id: "13",
    name: "Signature Logo Tee",
    slug: "signature-logo-tee",
    price: 2499,
    comparePrice: 2999,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    category: "T-Shirts",
    colors: ["Black", "White"],
    stock: 25,
    featured: true,
    isNew: false,
  },
  {
    id: "14",
    name: "Striped Cotton Tee",
    slug: "striped-cotton-tee",
    price: 1599,
    comparePrice: 1899,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
    category: "T-Shirts",
    colors: ["Blue/White", "Black/Grey"],
    stock: 0,
    featured: false,
    isNew: false,
  },
  {
    id: "15",
    name: "Pocket Essential Tee",
    slug: "pocket-essential-tee",
    price: 1199,
    comparePrice: 1499,
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    category: "T-Shirts",
    colors: ["Olive", "Navy", "Burgundy"],
    stock: 60,
    featured: false,
    isNew: false,
  },
  {
    id: "16",
    name: "Oversized Street Tee",
    slug: "oversized-street-tee",
    price: 2199,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80",
    category: "T-Shirts",
    colors: ["Black", "Purple", "Cream"],
    stock: 15,
    featured: true,
    isNew: true,
  },
  {
    id: "17",
    name: "Linen Blend Tee",
    slug: "linen-blend-tee",
    price: 1899,
    comparePrice: 2399,
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    category: "T-Shirts",
    colors: ["Sand", "Light Blue"],
    stock: 30,
    featured: false,
    isNew: true,
  },
  {
    id: "18",
    name: "Active Performance Tee",
    slug: "active-performance-tee",
    price: 1699,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80",
    category: "T-Shirts",
    colors: ["Electric Blue", "Neon Green"],
    stock: 22,
    featured: false,
    isNew: true,
  },
  {
    id: "19",
    name: "Tie-Dye Urban Tee",
    slug: "tie-dye-urban-tee",
    price: 2299,
    comparePrice: 2899,
    image:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&q=80",
    category: "T-Shirts",
    colors: ["Multi-Color", "Blue-Mist"],
    stock: 8,
    featured: true,
    isNew: false,
  },
  {
    id: "20",
    name: "Raglan Sleeve Tee",
    slug: "raglan-sleeve-tee",
    price: 1499,
    comparePrice: 1799,
    image:
      "https://images.unsplash.com/photo-1618354691249-1849c4cfac8d?w=600&q=80",
    category: "T-Shirts",
    colors: ["White/Black", "Grey/Navy"],
    stock: 45,
    featured: false,
    isNew: false,
  },
  {
    id: "21",
    name: "Henley Neck Tee",
    slug: "henley-neck-tee",
    price: 1799,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1620713303512-4217343e7426?w=600&q=80",
    category: "T-Shirts",
    colors: ["Charcoal", "Cream"],
    stock: 0,
    featured: true,
    isNew: false,
  },
  {
    id: "22",
    name: "Acid Wash Punk Tee",
    slug: "acid-wash-punk-tee",
    price: 2499,
    comparePrice: 3299,
    image:
      "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=600&q=80",
    category: "T-Shirts",
    colors: ["Dark Grey", "Faded Black"],
    stock: 18,
    featured: true,
    isNew: true,
  },
  {
    id: "23",
    name: "Embroidery Detail Tee",
    slug: "embroidery-detail-tee",
    price: 2799,
    comparePrice: 3499,
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    category: "T-Shirts",
    colors: ["White", "Black"],
    stock: 14,
    featured: true,
    isNew: false,
  },
  {
    id: "24",
    name: "Luxe Supima Tee",
    slug: "luxe-supima-tee",
    price: 3499,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
    category: "T-Shirts",
    colors: ["Midnight Blue", "Forest Green"],
    stock: 5,
    featured: true,
    isNew: true,
  },
  {
    id: "25",
    name: "Cyberpunk Graphic Tee",
    slug: "cyberpunk-graphic-tee",
    price: 2199,
    comparePrice: 2699,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
    category: "T-Shirts",
    colors: ["Black", "Neon Pink"],
    stock: 12,
    featured: true,
    isNew: true,
  },
  // Adding 20 Shirts
  {
    id: "29",
    name: "Oxford Button Down",
    slug: "oxford-button-down",
    price: 2499,
    comparePrice: 2999,
    image:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&q=80",
    category: "Shirts",
    colors: ["White", "Light Blue"],
    stock: 33,
    featured: true,
    isNew: true,
  },
  {
    id: "30",
    name: "Flannel Plaid Shirt",
    slug: "flannel-plaid-shirt",
    price: 1999,
    comparePrice: 2499,
    image:
      "https://images.unsplash.com/photo-1594932224827-c4d372580ec9?w=600&q=80",
    category: "Shirts",
    colors: ["Red/Black", "Green/Navy"],
    stock: 25,
    featured: false,
    isNew: false,
  },
  {
    id: "31",
    name: "Linen Informal Shirt",
    slug: "linen-informal-shirt",
    price: 2199,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    category: "Shirts",
    colors: ["Beige", "White"],
    stock: 19,
    featured: true,
    isNew: true,
  },
  {
    id: "32",
    name: "Denim Western Shirt",
    slug: "denim-western-shirt",
    price: 2799,
    comparePrice: 3499,
    image:
      "https://images.unsplash.com/photo-1541336032412-20242175cbc6?w=600&q=80",
    category: "Shirts",
    colors: ["Indigo", "Light Wash"],
    stock: 40,
    featured: false,
    isNew: false,
  },
  {
    id: "33",
    name: "Mandarin Collar Shirt",
    slug: "mandarin-collar-shirt",
    price: 1899,
    comparePrice: 2299,
    image:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80",
    category: "Shirts",
    colors: ["Navy", "Grey"],
    stock: 50,
    featured: true,
    isNew: true,
  },
  {
    id: "34",
    name: "Chambray Work Shirt",
    slug: "chambray-work-shirt",
    price: 2399,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1626497746280-c11fb3601053?w=600&q=80",
    category: "Shirts",
    colors: ["Blue"],
    stock: 14,
    featured: false,
    isNew: false,
  },
  {
    id: "35",
    name: "Corduroy Overshirt",
    slug: "corduroy-overshirt",
    price: 2999,
    comparePrice: 3999,
    image:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80",
    category: "Shirts",
    colors: ["Tan", "Brown"],
    stock: 10,
    featured: true,
    isNew: true,
  },
  {
    id: "36",
    name: "Printed Aloha Shirt",
    slug: "printed-aloha-shirt",
    price: 1699,
    comparePrice: 1999,
    image:
      "https://images.unsplash.com/photo-1559415104-569a19fb541f?w=600&q=80",
    category: "Shirts",
    colors: ["Floral", "Polka Dot"],
    stock: 22,
    featured: false,
    isNew: false,
  },
  {
    id: "37",
    name: "Poplin Office Shirt",
    slug: "poplin-office-shirt",
    price: 2599,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    category: "Shirts",
    colors: ["White", "Pink"],
    stock: 35,
    featured: false,
    isNew: false,
  },
  {
    id: "38",
    name: "Patterned Modal Shirt",
    slug: "patterned-modal-shirt",
    price: 2299,
    comparePrice: 2799,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    category: "Shirts",
    colors: ["Black Print"],
    stock: 18,
    featured: false,
    isNew: false,
  },
  {
    id: "39",
    name: "Heavy Twill Shirt",
    slug: "heavy-twill-shirt",
    price: 2899,
    comparePrice: 3499,
    image:
      "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?w=600&q=80",
    category: "Shirts",
    colors: ["Khaki", "Olive"],
    stock: 20,
    featured: true,
    isNew: false,
  },
  {
    id: "40",
    name: "Sateen Dress Shirt",
    slug: "sateen-dress-shirt",
    price: 3499,
    comparePrice: 4499,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd15e?w=600&q=80",
    category: "Shirts",
    colors: ["Black", "Champagne"],
    stock: 11,
    featured: true,
    isNew: true,
  },
  {
    id: "41",
    name: "Micro-Check Shirt",
    slug: "micro-check-shirt",
    price: 2099,
    comparePrice: 2599,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    category: "Shirts",
    colors: ["Blue/White"],
    stock: 25,
    featured: false,
    isNew: false,
  },
  {
    id: "42",
    name: "Band Collar Linen",
    slug: "band-collar-linen",
    price: 2399,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=600&q=80",
    category: "Shirts",
    colors: ["White", "Navy"],
    stock: 10,
    featured: false,
    isNew: true,
  },
  {
    id: "43",
    name: "Military Cargo Shirt",
    slug: "military-cargo-shirt",
    price: 2699,
    comparePrice: 3299,
    image:
      "https://images.unsplash.com/photo-1594932224827-c4d372580ec9?w=600&q=80",
    category: "Shirts",
    colors: ["Olive", "Black"],
    stock: 15,
    featured: false,
    isNew: false,
  },
  {
    id: "44",
    name: "Seersucker Summer Shirt",
    slug: "seersucker-summer-shirt",
    price: 1999,
    comparePrice: 2499,
    image:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
    category: "Shirts",
    colors: ["Light Blue"],
    stock: 30,
    featured: false,
    isNew: true,
  },
  {
    id: "45",
    name: "Grandad Collar Tee",
    slug: "grandad-collar-tee",
    price: 1599,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
    category: "Shirts",
    colors: ["White", "Charcoal"],
    stock: 40,
    featured: false,
    isNew: false,
  },
  {
    id: "46",
    name: "Bowling Retro Shirt",
    slug: "bowling-retro-shirt",
    price: 2199,
    comparePrice: 2799,
    image:
      "https://images.unsplash.com/photo-1594932224827-c4d372580ec9?w=600&q=80",
    category: "Shirts",
    colors: ["Black/Red"],
    stock: 5,
    featured: true,
    isNew: false,
  },
  {
    id: "47",
    name: "Textured Knit Shirt",
    slug: "textured-knit-shirt",
    price: 3299,
    comparePrice: 3999,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    category: "Shirts",
    colors: ["Cream", "Black"],
    stock: 8,
    featured: true,
    isNew: true,
  },
  {
    id: "48",
    name: "Evening Party Shirt",
    slug: "evening-party-shirt",
    price: 3899,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    category: "Shirts",
    colors: ["Black", "Midnight Blue"],
    stock: 15,
    featured: false,
    isNew: false,
  },

  // Adding 20 Pants
  {
    id: "49",
    name: "Classic Slim Chinos",
    slug: "classic-slim-chinos",
    price: 2499,
    comparePrice: 2999,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    category: "Pants",
    colors: ["Khaki", "Navy"],
    stock: 20,
    featured: true,
    isNew: true,
  },
  {
    id: "50",
    name: "Raw Edge Denim",
    slug: "raw-edge-denim",
    price: 3499,
    comparePrice: 4499,
    image:
      "https://images.unsplash.com/photo-1542272617-08f08316ecc6?w=600&q=80",
    category: "Pants",
    colors: ["Indigo"],
    stock: 15,
    featured: true,
    isNew: true,
  },
  {
    id: "51",
    name: "Cargo Utility Pants",
    slug: "cargo-utility-pants",
    price: 2999,
    comparePrice: 3799,
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80",
    category: "Pants",
    colors: ["Olive", "Black"],
    stock: 10,
    featured: false,
    isNew: true,
  },
  {
    id: "52",
    name: "Relaxed Fit Linen",
    slug: "relaxed-fit-linen",
    price: 2799,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    category: "Pants",
    colors: ["White", "Beige"],
    stock: 30,
    featured: true,
    isNew: false,
  },
  {
    id: "53",
    name: "Tailored Trousers",
    slug: "tailored-trousers",
    price: 3999,
    comparePrice: 4999,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    category: "Pants",
    colors: ["Grey", "Black"],
    stock: 12,
    featured: true,
    isNew: true,
  },
  {
    id: "54",
    name: "Jogger Sport Pants",
    slug: "jogger-sport-pants",
    price: 1899,
    comparePrice: 2299,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    category: "Pants",
    colors: ["Black", "Charcoal"],
    stock: 45,
    featured: false,
    isNew: false,
  },
  {
    id: "55",
    name: "Wide Leg Corduroy",
    slug: "wide-leg-corduroy",
    price: 3299,
    comparePrice: 4299,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    category: "Pants",
    colors: ["Brown", "Rust"],
    featured: true,
    isNew: true,
  },
  {
    id: "56",
    name: "Distressed Street Jeans",
    slug: "distressed-street-jeans",
    price: 3799,
    comparePrice: 4799,
    image:
      "https://images.unsplash.com/photo-1555689502-c4b22d328f86?w=600&q=80",
    category: "Pants",
    colors: ["Light Wash"],
    stock: 8,
    featured: false,
    isNew: false,
  },
  {
    id: "57",
    name: "Wool Blend Dress Pants",
    slug: "wool-blend-dress-pants",
    price: 4499,
    comparePrice: 5499,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    category: "Pants",
    colors: ["Navy"],
    stock: 10,
    featured: true,
    isNew: false,
  },
  {
    id: "58",
    name: "Graphic Printed Pants",
    slug: "graphic-printed-pants",
    price: 2599,
    comparePrice: 3199,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    category: "Pants",
    colors: ["Multi"],
    stock: 6,
    featured: false,
    isNew: true,
  },
  {
    id: "59",
    name: "Pleated Smart Pants",
    slug: "pleated-smart-pants",
    price: 3499,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    category: "Pants",
    colors: ["Black", "Tan"],
    stock: 20,
    featured: false,
    isNew: false,
  },
  {
    id: "60",
    name: "Drawstring Pyjama Pants",
    slug: "drawstring-pyjama-pants",
    price: 1499,
    comparePrice: 1899,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    category: "Pants",
    colors: ["Navy Print"],
    stock: 50,
    featured: false,
    isNew: false,
  },
  {
    id: "61",
    name: "Striped Track Pants",
    slug: "striped-track-pants",
    price: 1999,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    category: "Pants",
    colors: ["Black/White"],
    stock: 40,
    featured: false,
    isNew: false,
  },
  {
    id: "62",
    name: "Faux Leather Trousers",
    slug: "faux-leather-trousers",
    price: 4999,
    comparePrice: 6499,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    category: "Pants",
    colors: ["Black"],
    stock: 5,
    featured: true,
    isNew: true,
  },
  {
    id: "63",
    name: "Cropped Urban Pants",
    slug: "cropped-urban-pants",
    price: 2799,
    comparePrice: 3499,
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80",
    category: "Pants",
    colors: ["Grey"],
    stock: 15,
    featured: false,
    isNew: false,
  },
  {
    id: "64",
    name: "Tech Fleece Joggers",
    slug: "tech-fleece-joggers",
    price: 2999,
    comparePrice: 3799,
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    category: "Pants",
    colors: ["Black", "Grey"],
    stock: 25,
    featured: false,
    isNew: true,
  },
  {
    id: "65",
    name: "Velvet Lounge Pants",
    slug: "velvet-lounge-pants",
    price: 3499,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    category: "Pants",
    colors: ["Burgundy"],
    stock: 12,
    featured: true,
    isNew: false,
  },
  {
    id: "66",
    name: "Biker Knee Jeans",
    slug: "biker-knee-jeans",
    price: 4299,
    comparePrice: 5299,
    image:
      "https://images.unsplash.com/photo-1542272617-08f08316ecc6?w=600&q=80",
    category: "Pants",
    colors: ["Black Wash"],
    stock: 12,
    featured: false,
    isNew: false,
  },
  {
    id: "67",
    name: "Checkered Lounge Pants",
    slug: "checkered-lounge-pants",
    price: 1699,
    comparePrice: 2099,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    category: "Pants",
    colors: ["White/Black"],
    stock: 35,
    featured: false,
    isNew: false,
  },
  {
    id: "68",
    name: "Heavy Canvas Work Pants",
    slug: "heavy-canvas-work-pants",
    price: 3899,
    comparePrice: 4799,
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80",
    category: "Pants",
    colors: ["Yellow", "Olive"],
    stock: 20,
    featured: true,
    isNew: true,
  },

  // Adding 20 Jackets
  {
    id: "69",
    name: "Classic Bomber Jacket",
    slug: "classic-bomber-jacket",
    price: 4499,
    comparePrice: 5499,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    category: "Jackets",
    colors: ["Black", "Olive"],
    stock: 15,
    featured: true,
    isNew: true,
  },
  {
    id: "70",
    name: "Double Breasted Overcoat",
    slug: "double-breasted-overcoat",
    price: 8999,
    comparePrice: 10999,
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=600&q=80",
    category: "Jackets",
    colors: ["Camel", "Black"],
    stock: 5,
    featured: true,
    isNew: true,
  },
  {
    id: "71",
    name: "Puffer Winter Jacket",
    slug: "puffer-winter-jacket",
    price: 6999,
    comparePrice: 8499,
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=600&q=80",
    category: "Jackets",
    colors: ["Yellow", "Black"],
    stock: 10,
    featured: true,
    isNew: true,
  },
  {
    id: "72",
    name: "Leather Biker Jacket",
    slug: "leather-biker-jacket",
    price: 12999,
    comparePrice: 15999,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Jackets",
    colors: ["Black"],
    stock: 25,
    featured: true,
    isNew: false,
  },
  {
    id: "73",
    name: "Varsity Letterman",
    slug: "varsity-letterman",
    price: 5499,
    comparePrice: 6999,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Jackets",
    colors: ["Red/White", "Black/White"],
    stock: 8,
    featured: false,
    isNew: true,
  },
  {
    id: "74",
    name: "Windbreaker Pro",
    slug: "windbreaker-pro",
    price: 3499,
    comparePrice: 4299,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    category: "Jackets",
    colors: ["Neon Blue"],
    stock: 20,
    featured: false,
    isNew: true,
  },
  {
    id: "75",
    name: "Sherpa Lined Trucker",
    slug: "sherpa-lined-trucker",
    price: 5999,
    comparePrice: 7499,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Jackets",
    colors: ["Blue Denim"],
    stock: 12,
    featured: true,
    isNew: false,
  },
  {
    id: "76",
    name: "Technical Shell Parka",
    slug: "technical-shell-parka",
    price: 9999,
    comparePrice: 12499,
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=600&q=80",
    category: "Jackets",
    colors: ["Black"],
    stock: 15,
    featured: true,
    isNew: true,
  },
  {
    id: "77",
    name: "Harrington Classic",
    slug: "harrington-classic",
    price: 4799,
    comparePrice: 5999,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    category: "Jackets",
    colors: ["Navy", "Tan"],
    stock: 10,
    featured: false,
    isNew: false,
  },
  {
    id: "78",
    name: "Faux Fur Glam Jacket",
    slug: "faux-fux-glam-jacket",
    price: 7499,
    comparePrice: 9999,
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=600&q=80",
    category: "Jackets",
    colors: ["White", "Silver"],
    stock: 5,
    featured: true,
    isNew: true,
  },
  {
    id: "79",
    name: "Corduroy Trucker Jacket",
    slug: "corduroy-trucker-jacket",
    price: 4299,
    comparePrice: 5299,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    category: "Jackets",
    colors: ["Brown"],
    stock: 20,
    featured: false,
    isNew: false,
  },
  {
    id: "80",
    name: "Peacoat Wool Navy",
    slug: "peacoat-wool-navy",
    price: 8499,
    comparePrice: 10499,
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=600&q=80",
    category: "Jackets",
    colors: ["Midnight Navy"],
    stock: 15,
    featured: true,
    isNew: false,
  },
  {
    id: "81",
    name: "Quilted Vest",
    slug: "quilted-vest",
    price: 2999,
    comparePrice: 3799,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    category: "Jackets",
    colors: ["Olive", "Black"],
    stock: 25,
    featured: false,
    isNew: false,
  },
  {
    id: "82",
    name: "Anorak Popover",
    slug: "anorak-popover",
    price: 3999,
    comparePrice: 4999,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    category: "Jackets",
    colors: ["Yellow/Blue"],
    stock: 12,
    featured: false,
    isNew: true,
  },
  {
    id: "83",
    name: "Trench Coat Luxe",
    slug: "trench-coat-luxe",
    price: 11999,
    comparePrice: 14999,
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=600&q=80",
    category: "Jackets",
    colors: ["Beige"],
    stock: 8,
    featured: true,
    isNew: true,
  },
  {
    id: "84",
    name: "Trucker Denim Black",
    slug: "trucker-denim-black",
    price: 3999,
    comparePrice: 4999,
    image:
      "https://images.unsplash.com/photo-1550246140-5119ae4790b8?w=600&q=80",
    category: "Jackets",
    colors: ["Black"],
    stock: 30,
    featured: false,
    isNew: false,
  },
  {
    id: "85",
    name: "Raincoat Performance",
    slug: "raincoat-performance",
    price: 3499,
    comparePrice: 4299,
    image:
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600&q=80",
    category: "Jackets",
    colors: ["Yellow"],
    stock: 22,
    featured: false,
    isNew: true,
  },
  {
    id: "86",
    name: "Blazer Formal Slim",
    slug: "blazer-formal-slim",
    price: 5999,
    comparePrice: 7499,
    image:
      "https://images.unsplash.com/photo-1594932224491-9944ef667a4f?w=600&q=80",
    category: "Jackets",
    colors: ["Black", "Grey"],
    stock: 18,
    featured: true,
    isNew: false,
  },
  {
    id: "87",
    name: "Coach Street Jacket",
    slug: "coach-street-jacket",
    price: 3299,
    comparePrice: 3999,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    category: "Jackets",
    colors: ["Green", "Black"],
    stock: 25,
    featured: false,
    isNew: false,
  },
  {
    id: "88",
    name: "Faux Suede Jacket",
    slug: "faux-suede-jacket",
    price: 5499,
    comparePrice: 6999,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Jackets",
    colors: ["Camel"],
    featured: true,
    isNew: true,
  },
];

const categories = [
  { label: "All", value: "all" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Shirts", value: "shirts" },
  { label: "Jackets", value: "jackets" },
  { label: "Pants", value: "pants" },
  { label: "Sweaters", value: "sweaters" },
  { label: "Accessories", value: "accessories" },
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Popular", value: "popular" },
];

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-16 container text-center">Loading...</div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const [sortOption, setSortOption] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewColumns, setViewColumns] = useState(4);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleCategoryChange = (categoryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryValue === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryValue);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
    setVisibleCount(8);
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase().replace(" ", "-") === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesColor =
        selectedColors.length === 0 ||
        product.colors.some((color) => selectedColors.includes(color));

      return matchesCategory && matchesPrice && matchesColor;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popular":
          return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
        case "newest":
        default:
          return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      }
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn className="mb-8 font-sans">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
            Shop All
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
            Discover our complete collection of premium fashion essentials
          </p>
        </FadeIn>

        {/* Filters Bar */}
        <FadeIn delay={0.1} className="flex flex-col gap-6 mb-8 pb-6 border-b">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant={isFilterOpen ? "default" : "outline"}
                size="sm"
                className="gap-2 brutal-border shadow-hard hover:shadow-none transition-all"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                FILTERS {isFilterOpen ? "(CLOSE)" : ""}
              </Button>
              <div className="hidden lg:flex items-center gap-2">
                {categories.slice(0, 5).map((cat) => (
                  <Button
                    key={cat.value}
                    variant={
                      selectedCategory === cat.value ? "default" : "ghost"
                    }
                    size="sm"
                    className="font-bold uppercase tracking-tighter"
                    onClick={() => handleCategoryChange(cat.value)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-44 brutal-border font-bold uppercase">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="font-bold uppercase"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="hidden sm:flex items-center gap-1 border-2 border-black p-1 bg-white">
                <Button
                  variant={viewColumns === 3 ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setViewColumns(3)}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewColumns === 4 ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setViewColumns(4)}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Sidebar/Drawer Area */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-2 border-black p-6 bg-secondary/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Price Filter */}
                  <div>
                    <h4 className="font-black uppercase tracking-tighter mb-4 text-sm underline decoration-accent decoration-4">
                      Price Range
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs font-bold font-mono">
                        <span>{formatCurrency(priceRange[0])}</span>
                        <span>{formatCurrency(priceRange[1])}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="15000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full accent-black"
                      />
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="md:col-span-2">
                    <h4 className="font-black uppercase tracking-tighter mb-4 text-sm underline decoration-accent decoration-4">
                      Colors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map((color) => (
                        <Button
                          key={color}
                          variant={
                            selectedColors.includes(color)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="h-8 rounded-none border-2 border-black font-bold text-[10px] uppercase"
                          onClick={() => toggleColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t-2 border-dashed border-black flex justify-end">
                  <Button
                    variant="link"
                    className="font-black uppercase tracking-tighter"
                    onClick={() => {
                      setSelectedColors([]);
                      setPriceRange([0, 15000]);
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Categories (Collapsible) - Legacy support or unified */}
        </FadeIn>

        {/* Results count */}
        <FadeIn delay={0.2} className="mb-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Showing{" "}
            <span className="text-black bg-accent px-1">
              {visibleProducts.length}
            </span>{" "}
            of {filteredProducts.length} products
          </p>
        </FadeIn>

        {/* Products Grid */}
        <div
          className={cn(
            "grid gap-8 transition-all duration-500",
            viewColumns === 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {visibleProducts.length === 0 && (
          <div className="text-center py-32 border-4 border-dashed border-muted rounded-none">
            <h3 className="font-black text-4xl uppercase tracking-tighter mb-4">
              Nothing Found
            </h3>
            <p className="text-muted-foreground uppercase font-bold text-xs tracking-widest">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        )}

        {/* Load More */}
        {visibleProducts.length < filteredProducts.length && (
          <FadeIn delay={0.3} className="mt-16 text-center">
            <Button
              variant="outline"
              size="lg"
              className="brutal-border shadow-hard hover:shadow-none transition-all font-black uppercase italic tracking-tighter px-12 group"
              onClick={handleLoadMore}
            >
              Load More
              <ChevronDown className="h-5 w-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </FadeIn>
        )}

        {/* Recently Viewed */}
        <RecentlyViewed />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [showQuickView, setShowQuickView] = React.useState(false);
  const {
    addItem: addToCompare,
    isInCompare,
    removeItem: removeFromCompare,
  } = useCompareStore();
  const isCompared = isInCompare(product.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCompared) {
      removeFromCompare(product.id);
      toast.success("Removed from comparison");
    } else {
      addToCompare({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock ?? 0,
      });
      toast.success("Added to comparison");
    }
  };

  const discount = product.comparePrice
    ? calculateDiscountPercentage(product.comparePrice, product.price)
    : 0;

  return (
    <>
      <div className="group block brutal-border p-2 bg-white hover:bg-zinc-50 transition-colors relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-product overflow-hidden border-2 border-black">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNew && (
                <Badge className="bg-accent text-black font-black uppercase text-[10px] rounded-none border-2 border-black rotate-[-2deg]">
                  New Arrival
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-black text-white font-black uppercase text-[10px] rounded-none border-2 border-black rotate-[2deg]">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
            {/* Quick view button overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="font-black uppercase text-xl text-white bg-black p-4 brutal-border -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-hard">
                View Details
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {product.category}
                </p>
                <h3 className="font-bold text-lg uppercase tracking-tighter text-black group-hover:underline underline-offset-4 decoration-2 decoration-accent">
                  {product.name}
                </h3>
              </div>
              <div className="text-right">
                <p className="font-black text-xl tracking-tighter text-black">
                  {formatCurrency(product.price)}
                </p>
                {product.comparePrice && (
                  <p className="text-xs text-muted-foreground line-through font-bold">
                    {formatCurrency(product.comparePrice)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Quick View Button */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              setShowQuickView(true);
            }}
            className="bg-white dark:bg-black p-2 brutal-border shadow-hard"
          >
            <Eye className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCompare}
            className={cn(
              "bg-white dark:bg-black p-2 brutal-border shadow-hard transition-colors",
              isCompared && "bg-black text-white dark:bg-white dark:text-black",
            )}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <QuickViewModal
        product={{
          ...product,
          stock: product.stock ?? 0,
          comparePrice: product.comparePrice ?? null,
        }}
        open={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}
