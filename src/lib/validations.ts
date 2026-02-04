import { z } from "zod";

// ==================== USER SCHEMAS ====================

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
});

// ==================== ADDRESS SCHEMAS ====================

export const addressSchema = z.object({
  label: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),
  street: z.string().min(5, "Street address must be at least 5 characters"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Please enter a valid 6-digit postal code"),
  country: z.string().default("India"),
  isDefault: z.boolean().default(false),
});

// ==================== PRODUCT SCHEMAS ====================

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  comparePrice: z.number().positive().optional().nullable(),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z
    .array(
      z.object({
        name: z.string(),
        hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
      }),
    )
    .min(1, "At least one color is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  lowStockThreshold: z.number().int().min(0).default(5),
  categoryId: z.string().min(1, "Category is required"),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const updateProductSchema = productSchema.partial();

// ==================== CATEGORY SCHEMAS ====================

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  description: z.string().optional(),
  image: z.string().url().optional().nullable(),
  parentId: z.string().optional().nullable(),
});

// ==================== ORDER SCHEMAS ====================

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
        size: z.string().optional(),
        color: z.string().optional(),
      }),
    )
    .min(1, "Order must have at least one item"),
  shippingAddressId: z.string().min(1, "Shipping address is required"),
  paymentMethod: z.enum(["RAZORPAY", "COD"]),
  couponCode: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED",
  ]),
  notes: z.string().optional(),
});

// ==================== REVIEW SCHEMAS ====================

export const reviewSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .optional(),
  images: z.array(z.string().url()).optional(),
});

// ==================== COUPON SCHEMAS ====================

export const couponSchema = z
  .object({
    code: z
      .string()
      .min(3, "Code must be at least 3 characters")
      .max(20, "Code must be at most 20 characters")
      .regex(
        /^[A-Z0-9]+$/,
        "Code must contain only uppercase letters and numbers",
      ),
    description: z.string().optional(),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    value: z.number().positive("Value must be greater than 0"),
    minPurchase: z.number().positive().optional().nullable(),
    maxDiscount: z.number().positive().optional().nullable(),
    usageLimit: z.number().int().positive().optional().nullable(),
    perUserLimit: z.number().int().positive().default(1),
    validFrom: z.date(),
    validTo: z.date(),
    active: z.boolean().default(true),
  })
  .refine((data) => data.validTo > data.validFrom, {
    message: "End date must be after start date",
    path: ["validTo"],
  });

// ==================== CART SCHEMAS ====================

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  size: z.string(),
  color: z.string(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive(),
});

// ==================== SEARCH/FILTER SCHEMAS ====================

export const productFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "popular"]).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(12),
});

// ==================== TYPE EXPORTS ====================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type ProductFiltersInput = z.infer<typeof productFiltersSchema>;
