// Site configuration
export const siteConfig = {
  name: "DEVFLOW",
  description:
    "Premium fashion e-commerce platform offering curated collections of luxury clothing and accessories.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/devflowfashion",
    instagram: "https://instagram.com/devflowfashion",
    facebook: "https://facebook.com/devflowfashion",
  },
  creator: "DEVFLOW Fashion",
  keywords: [
    "luxury fashion",
    "premium clothing",
    "designer wear",
    "fashion e-commerce",
    "online shopping",
    "trendy outfits",
    "sustainable fashion",
  ],
};

// Currency configuration
export const currencyConfig = {
  currency: process.env.NEXT_PUBLIC_CURRENCY || "INR",
  symbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹",
  locale: "en-IN",
};

// Navigation links
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Footer links
export const footerLinks = {
  shop: [
    { href: "/products?category=men", label: "Men" },
    { href: "/products?category=women", label: "Women" },
    { href: "/products?category=accessories", label: "Accessories" },
    { href: "/products?featured=true", label: "Featured" },
    { href: "/products?sort=newest", label: "New Arrivals" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQs" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns & Exchanges" },
    { href: "/size-guide", label: "Size Guide" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/press", label: "Press" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

// Product sizes
export const productSizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Default product colors
export const defaultColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#1E3A5F" },
  { name: "Beige", hex: "#D4C4A8" },
  { name: "Grey", hex: "#6B7280" },
  { name: "Brown", hex: "#8B5A2B" },
  { name: "Olive", hex: "#6B8E23" },
  { name: "Burgundy", hex: "#722F37" },
  { name: "Blush", hex: "#DE98AB" },
  { name: "Sage", hex: "#9CAF88" },
];

// Order statuses with colors
export const orderStatuses = {
  PENDING: {
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  PROCESSING: {
    label: "Processing",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  SHIPPED: {
    label: "Shipped",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  DELIVERED: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  REFUNDED: {
    label: "Refunded",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
};

// Payment methods
export const paymentMethods = {
  RAZORPAY: { label: "Razorpay (Cards, UPI, Wallets)", icon: "CreditCard" },
  COD: { label: "Cash on Delivery", icon: "Banknote" },
};

// Pagination defaults
export const paginationConfig = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48],
};

// Image placeholders
export const placeholders = {
  product: "/placeholder-product.jpg",
  avatar: "/placeholder-avatar.jpg",
  category: "/placeholder-category.jpg",
};

// Animation variants for Framer Motion
export const motionVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Transition presets
export const transitions = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  base: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  slower: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  spring: { type: "spring", stiffness: 400, damping: 30 },
  bounce: { type: "spring", stiffness: 600, damping: 20 },
};
