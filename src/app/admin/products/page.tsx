"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

// Mock products data
const products = [
  {
    id: "1",
    name: "Premium Cotton Tee",
    slug: "premium-cotton-tee",
    sku: "PCT-001",
    price: 1499,
    stock: 45,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    sku: "CDJ-002",
    price: 3999,
    stock: 12,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
  },
  {
    id: "3",
    name: "Silk Blend Shirt",
    sku: "SBS-003",
    price: 2499,
    stock: 0,
    category: "Shirts",
    status: "DRAFT",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
  },
  {
    id: "4",
    name: "Tailored Chinos",
    sku: "TCH-004",
    price: 2799,
    stock: 28,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80",
  },
  {
    id: "5",
    name: "Merino Wool Sweater",
    sku: "MWS-005",
    price: 3499,
    stock: 8,
    category: "Sweaters",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
  },
  {
    id: "6",
    name: "Linen Summer Shirt",
    sku: "LSS-006",
    price: 1999,
    stock: 35,
    category: "Shirts",
    status: "ARCHIVED",
    image:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&q=80",
  },
  {
    id: "7",
    name: "Leather Belt",
    sku: "ACC-007",
    price: 1299,
    stock: 50,
    category: "Accessories",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
  },
  {
    id: "8",
    name: "Cashmere Scarf",
    sku: "ACC-008",
    price: 2199,
    stock: 15,
    category: "Accessories",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80",
  },
  // T-Shirts
  {
    id: "9",
    name: "Graphic Street Tee",
    sku: "TST-009",
    price: 1299,
    stock: 20,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?w=600&q=80",
    slug: "graphic-street-tee",
  },
  {
    id: "10",
    name: "Minimalist V-Neck",
    sku: "TST-010",
    price: 999,
    stock: 100,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: "11",
    name: "Vintage Wash Tee",
    sku: "TST-011",
    price: 1799,
    stock: 12,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
  },
  {
    id: "12",
    name: "Heavyweight Boxy Tee",
    sku: "TST-012",
    price: 1999,
    stock: 40,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
  },
  {
    id: "13",
    name: "Signature Logo Tee",
    sku: "TST-013",
    price: 2499,
    stock: 25,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  },
  {
    id: "14",
    name: "Striped Cotton Tee",
    sku: "TST-014",
    price: 1599,
    stock: 0,
    category: "T-Shirts",
    status: "DRAFT",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80",
  },
  {
    id: "15",
    name: "Pocket Essential Tee",
    sku: "TST-015",
    price: 1199,
    stock: 60,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&q=80",
  },
  {
    id: "16",
    name: "Oversized Street Tee",
    sku: "TST-016",
    price: 2199,
    stock: 15,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=200&q=80",
  },
  {
    id: "17",
    name: "Linen Blend Tee",
    sku: "TST-017",
    price: 1899,
    stock: 30,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&q=80",
  },
  {
    id: "18",
    name: "Active Performance Tee",
    sku: "TST-018",
    price: 1699,
    stock: 22,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=200&q=80",
  },
  {
    id: "19",
    name: "Tie-Dye Urban Tee",
    sku: "TST-019",
    price: 2299,
    stock: 8,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=400&q=80",
  },
  {
    id: "20",
    name: "Raglan Sleeve Tee",
    sku: "TST-020",
    price: 1499,
    stock: 45,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1549037224-ad747e903c73?w=400&q=80",
  },
  {
    id: "21",
    name: "Henley Neck Tee",
    sku: "TST-021",
    price: 1799,
    stock: 0,
    category: "T-Shirts",
    status: "ARCHIVED",
    image:
      "https://images.unsplash.com/photo-1620713303512-4217343e7426?w=400&q=80",
  },
  {
    id: "22",
    name: "Acid Wash Punk Tee",
    sku: "TST-022",
    price: 2499,
    stock: 18,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1574180563860-563a3bbd015e?w=400&q=80",
  },
  {
    id: "23",
    name: "Embroidery Detail Tee",
    sku: "TST-023",
    price: 2799,
    stock: 14,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
  },
  {
    id: "24",
    name: "Luxe Supima Tee",
    sku: "TST-024",
    price: 3499,
    stock: 5,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80",
  },
  {
    id: "25",
    name: "Cyberpunk Graphic Tee",
    sku: "TST-025",
    price: 2199,
    stock: 12,
    category: "T-Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1552066344-24632e2e9163?w=600&q=80",
  },
  {
    id: "29",
    name: "Oxford Button Down",
    sku: "SHR-029",
    price: 2499,
    stock: 33,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&q=80",
  },
  {
    id: "30",
    name: "Flannel Plaid Shirt",
    sku: "SHR-030",
    price: 1999,
    stock: 25,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1594932224827-c4d372580ec9?w=200&q=80",
  },
  {
    id: "31",
    name: "Linen Informal Shirt",
    sku: "SHR-031",
    price: 2199,
    stock: 19,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80",
  },
  {
    id: "32",
    name: "Denim Western Shirt",
    sku: "SHR-032",
    price: 2799,
    stock: 40,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&q=80",
  },
  {
    id: "33",
    name: "Mandarin Collar Shirt",
    sku: "SHR-033",
    price: 1899,
    stock: 50,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd15e?w=200&q=80",
  },
  {
    id: "34",
    name: "Chambray Work Shirt",
    sku: "SHR-034",
    price: 2399,
    stock: 14,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&q=80",
  },
  {
    id: "35",
    name: "Corduroy Overshirt",
    sku: "SHR-035",
    price: 2999,
    stock: 0,
    category: "Shirts",
    status: "DRAFT",
    image:
      "https://images.unsplash.com/photo-1621072156002-e2fcc103e81e?w=200&q=80",
  },
  {
    id: "36",
    name: "Printed Aloha Shirt",
    sku: "SHR-036",
    price: 1699,
    stock: 22,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80",
  },
  {
    id: "37",
    name: "Poplin Office Shirt",
    sku: "SHR-037",
    price: 2599,
    stock: 35,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&q=80",
  },
  {
    id: "38",
    name: "Patterned Modal Shirt",
    sku: "SHR-038",
    price: 2299,
    stock: 18,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1559415104-569a19fb541f?w=400&q=80",
  },
  {
    id: "39",
    name: "Heavy Twill Shirt",
    sku: "SHR-039",
    price: 2899,
    stock: 20,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?w=400&q=80",
  },
  {
    id: "40",
    name: "Sateen Dress Shirt",
    sku: "SHR-040",
    price: 3499,
    stock: 11,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd15e?w=400&q=80",
  },
  {
    id: "41",
    name: "Micro-Check Shirt",
    sku: "SHR-041",
    price: 2099,
    stock: 25,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
  },
  {
    id: "42",
    name: "Band Collar Linen",
    sku: "SHR-042",
    price: 2399,
    stock: 10,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=400&q=80",
  },
  {
    id: "43",
    name: "Military Cargo Shirt",
    sku: "SHR-043",
    price: 2699,
    stock: 15,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1594932224827-c4d372580ec9?w=600&q=80",
  },
  {
    id: "44",
    name: "Seersucker Summer Shirt",
    sku: "SHR-044",
    price: 1999,
    stock: 30,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
  },
  {
    id: "45",
    name: "Grandad Collar Tee",
    sku: "SHR-045",
    price: 1599,
    stock: 40,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  },
  {
    id: "46",
    name: "Bowling Retro Shirt",
    sku: "SHR-046",
    price: 2199,
    stock: 5,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
  },
  {
    id: "47",
    name: "Textured Knit Shirt",
    sku: "SHR-047",
    price: 3299,
    stock: 8,
    category: "Shirts",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
  },
  {
    id: "48",
    name: "Evening Party Shirt",
    sku: "SHR-048",
    price: 3899,
    stock: 0,
    category: "Shirts",
    status: "DRAFT",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
  },
  // Pants
  {
    id: "49",
    name: "Classic Slim Chinos",
    sku: "PNT-049",
    price: 2499,
    stock: 20,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&q=80",
  },
  {
    id: "50",
    name: "Raw Edge Denim",
    sku: "PNT-050",
    price: 3499,
    stock: 15,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1542272617-08f08316ecc6?w=200&q=80",
  },
  {
    id: "51",
    name: "Cargo Utility Pants",
    sku: "PNT-051",
    price: 2999,
    stock: 10,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=200&q=80",
  },
  {
    id: "52",
    name: "Relaxed Fit Linen",
    sku: "PNT-052",
    price: 2799,
    stock: 30,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&q=80",
  },
  {
    id: "53",
    name: "Tailored Trousers",
    sku: "PNT-053",
    price: 3999,
    stock: 12,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&q=80",
  },
  {
    id: "54",
    name: "Jogger Sport Pants",
    sku: "PNT-054",
    price: 1899,
    stock: 45,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=200&q=80",
  },
  {
    id: "55",
    name: "Wide Leg Corduroy",
    sku: "PNT-055",
    price: 3299,
    stock: 0,
    category: "Pants",
    status: "DRAFT",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80",
  },
  {
    id: "56",
    name: "Distressed Street Jeans",
    sku: "PNT-056",
    price: 3799,
    stock: 8,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1555689502-c4b22d328f86?w=200&q=80",
  },
  {
    id: "57",
    name: "Wool Blend Dress Pants",
    sku: "PNT-057",
    price: 4499,
    stock: 10,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&q=80",
  },
  {
    id: "58",
    name: "Graphic Printed Pants",
    sku: "PNT-058",
    price: 2599,
    stock: 6,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1624371414361-e6e8ea08c110?w=600&q=80",
  },
  {
    id: "59",
    name: "Pleated Smart Pants",
    sku: "PNT-059",
    price: 3499,
    stock: 20,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&q=80",
  },
  {
    id: "60",
    name: "Drawstring Pyjama Pants",
    sku: "PNT-060",
    price: 1499,
    stock: 50,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&q=80",
  },
  {
    id: "61",
    name: "Striped Track Pants",
    sku: "PNT-061",
    price: 1999,
    stock: 40,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=200&q=80",
  },
  {
    id: "62",
    name: "Faux Leather Trousers",
    sku: "PNT-062",
    price: 4999,
    stock: 5,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80",
  },
  {
    id: "63",
    name: "Cropped Urban Pants",
    sku: "PNT-063",
    price: 2799,
    stock: 15,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=200&q=80",
  },
  {
    id: "64",
    name: "Tech Fleece Joggers",
    sku: "PNT-064",
    price: 2999,
    stock: 25,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=200&q=80",
  },
  {
    id: "65",
    name: "Velvet Lounge Pants",
    sku: "PNT-065",
    price: 3499,
    stock: 12,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&q=80",
  },
  {
    id: "66",
    name: "Biker Knee Jeans",
    sku: "PNT-066",
    price: 4299,
    stock: 0,
    category: "Pants",
    status: "DRAFT",
    image:
      "https://images.unsplash.com/photo-1542272617-08f08316ecc6?w=200&q=80",
  },
  {
    id: "67",
    name: "Checkered Lounge Pants",
    sku: "PNT-067",
    price: 1699,
    stock: 35,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&q=80",
  },
  {
    id: "68",
    name: "Heavy Canvas Work Pants",
    sku: "PNT-068",
    price: 3899,
    stock: 20,
    category: "Pants",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=200&q=80",
  },
  // Jackets
  {
    id: "69",
    name: "Classic Bomber Jacket",
    sku: "JKT-069",
    price: 4499,
    stock: 15,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "70",
    name: "Double Breasted Overcoat",
    sku: "JKT-070",
    price: 8999,
    stock: 5,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=200&q=80",
  },
  {
    id: "71",
    name: "Puffer Winter Jacket",
    sku: "JKT-071",
    price: 6999,
    stock: 10,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=200&q=80",
  },
  {
    id: "72",
    name: "Leather Biker Jacket",
    sku: "JKT-072",
    price: 12999,
    stock: 4,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
  },
  {
    id: "73",
    name: "Varsity Letterman",
    sku: "JKT-073",
    price: 5499,
    stock: 20,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
  },
  {
    id: "74",
    name: "Windbreaker Pro",
    sku: "JKT-074",
    price: 3499,
    stock: 50,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "75",
    name: "Sherpa Lined Trucker",
    sku: "JKT-075",
    price: 5999,
    stock: 12,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
  },
  {
    id: "76",
    name: "Technical Shell Parka",
    sku: "JKT-076",
    price: 9999,
    stock: 8,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=200&q=80",
  },
  {
    id: "77",
    name: "Harrington Classic",
    sku: "JKT-077",
    price: 4799,
    stock: 15,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "78",
    name: "Faux Fur Glam Jacket",
    sku: "JKT-078",
    price: 7499,
    stock: 0,
    category: "Jackets",
    status: "DRAFT",
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=200&q=80",
  },
  {
    id: "79",
    name: "Corduroy Trucker Jacket",
    sku: "JKT-079",
    price: 4299,
    stock: 22,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "80",
    name: "Peacoat Wool Navy",
    sku: "JKT-080",
    price: 8499,
    stock: 7,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=200&q=80",
  },
  {
    id: "81",
    name: "Quilted Vest",
    sku: "JKT-081",
    price: 2999,
    stock: 35,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "82",
    name: "Anorak Popover",
    sku: "JKT-082",
    price: 3999,
    stock: 18,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "83",
    name: "Trench Coat Luxe",
    sku: "JKT-083",
    price: 11999,
    stock: 3,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=200&q=80",
  },
  {
    id: "84",
    name: "Trucker Denim Black",
    sku: "JKT-084",
    price: 3999,
    stock: 14,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
  },
  {
    id: "85",
    name: "Raincoat Performance",
    sku: "JKT-085",
    price: 3499,
    stock: 25,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "86",
    name: "Blazer Formal Slim",
    sku: "JKT-086",
    price: 5999,
    stock: 10,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=200&q=80",
  },
  {
    id: "87",
    name: "Coach Street Jacket",
    sku: "JKT-087",
    price: 3299,
    stock: 15,
    category: "Jackets",
    status: "ACTIVE",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80",
  },
  {
    id: "88",
    name: "Faux Suede Jacket",
    sku: "JKT-088",
    price: 5499,
    stock: 0,
    category: "Jackets",
    status: "ARCHIVED",
    image:
      "https://images.unsplash.com/photo-1539533377285-b9ca3c93a005?w=200&q=80",
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: "default",
  DRAFT: "secondary",
  ARCHIVED: "outline",
};

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-accent text-black font-bold px-0.5 rounded-sm"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery || statusFilter !== "all") {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 800); // 800ms delay to simulate search
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, statusFilter]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{productList.length}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {productList.filter((p) => p.status === "ACTIVE").length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Package className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {productList.filter((p) => p.stock === 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearching(true);
                  }}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Products Table */}
      <FadeIn delay={0.3}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Product
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                      SKU
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">
                      Category
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                      Stock
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {isSearching ? (
                    <tr key="searching">
                      <td colSpan={7} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                          <Loader2 className="h-10 w-10 text-white animate-spin" />
                          <p className="text-white font-bold italic">
                            searching items...
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr key="no-results">
                      <td colSpan={7} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Search className="h-8 w-8 text-zinc-500 mb-2" />
                          <p className="text-white text-lg font-bold">
                            No results found
                          </p>
                          <p className="text-zinc-500">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/10">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={56}
                                height={56}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <span className="font-bold text-white tracking-tight">
                              <HighlightText
                                text={product.name}
                                query={searchQuery}
                              />
                            </span>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="font-mono text-xs text-zinc-500">
                            {product.sku}
                          </span>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white">
                            {formatCurrency(product.price)}
                          </span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span
                            className={
                              product.stock === 0
                                ? "text-red-500"
                                : product.stock < 10
                                  ? "text-yellow-500"
                                  : "text-zinc-400"
                            }
                          >
                            {product.stock === 0
                              ? "Out of stock"
                              : `${product.stock} in stock`}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge
                            className="rounded-none border-2 font-black text-[10px] uppercase"
                            variant={
                              statusColors[product.status] as
                                | "default"
                                | "secondary"
                                | "outline"
                            }
                          >
                            {product.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white/10"
                              >
                                <MoreHorizontal className="h-4 w-4 text-white" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-black border-white/10 text-white"
                            >
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/products/${product.slug || product.name.toLowerCase().replace(/ /g, "-")}`}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View on Site
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/admin/products/edit/${product.id}`}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-white/10" />
                              <DropdownMenuItem
                                className="text-red-500 focus:text-red-500"
                                onClick={() => handleDelete(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
