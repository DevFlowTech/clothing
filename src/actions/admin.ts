"use server";

import { connectDB } from "@/lib/db";
import { Product, Category, Order, Coupon } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

// ==================== PRODUCT ACTIONS ====================

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  sku: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  categoryId: string;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}) {
  try {
    await requireAdmin();
    await connectDB();

    const slug = slugify(data.name);

    // Check if slug exists
    const existingSlug = await Product.findOne({ slug });

    // Check if SKU exists
    const existingSku = await Product.findOne({ sku: data.sku });

    if (existingSlug) {
      return {
        success: false,
        error: "A product with this name already exists",
      };
    }

    if (existingSku) {
      return {
        success: false,
        error: "A product with this SKU already exists",
      };
    }

    const product = await Product.create({
      ...data,
      slug,
      category: data.categoryId,
      comparePrice: data.comparePrice ?? undefined,
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, product: { id: product._id.toString() } };
  } catch (error) {
    console.error("Create product error:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(
  productId: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    comparePrice: number | null;
    images: string[];
    sku: string;
    sizes: string[];
    colors: { name: string; hex: string }[];
    stock: number;
    categoryId: string;
    status: "DRAFT" | "ACTIVE" | "ARCHIVED";
    featured: boolean;
    metaTitle: string;
    metaDescription: string;
  }>,
) {
  try {
    await requireAdmin();
    await connectDB();

    const updateData: Record<string, unknown> = { ...data };

    // Update slug if name changed
    if (data.name) {
      const slug = slugify(data.name);
      const existingSlug = await Product.findOne({
        slug,
        _id: { $ne: productId },
      });
      if (existingSlug) {
        return {
          success: false,
          error: "A product with this name already exists",
        };
      }
      updateData.slug = slug;
    }

    // Check SKU uniqueness
    if (data.sku) {
      const existingSku = await Product.findOne({
        sku: data.sku,
        _id: { $ne: productId },
      });
      if (existingSku) {
        return {
          success: false,
          error: "A product with this SKU already exists",
        };
      }
    }

    // Map categoryId to category
    if (data.categoryId) {
      updateData.category = data.categoryId;
      delete updateData.categoryId;
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    if (product) {
      revalidatePath(`/products/${product.slug}`);
    }
    return { success: true };
  } catch (error) {
    console.error("Update product error:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(productId: string) {
  try {
    await requireAdmin();
    await connectDB();

    // Soft delete
    await Product.findByIdAndUpdate(productId, { deletedAt: new Date() });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Delete product error:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

// ==================== CATEGORY ACTIONS ====================

export async function createCategory(data: {
  name: string;
  description?: string;
  image?: string | null;
  parentId?: string | null;
}) {
  try {
    await requireAdmin();
    await connectDB();

    const slug = slugify(data.name);

    const existingSlug = await Category.findOne({ slug });

    if (existingSlug) {
      return {
        success: false,
        error: "A category with this name already exists",
      };
    }

    const category = await Category.create({
      ...data,
      slug,
      image: data.image ?? undefined,
      parentId: data.parentId ?? undefined,
    });

    revalidatePath("/admin/categories");
    return { success: true, category: { id: category._id.toString() } };
  } catch (error) {
    console.error("Create category error:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(
  categoryId: string,
  data: {
    name?: string;
    description?: string;
    image?: string | null;
    parentId?: string | null;
  },
) {
  try {
    await requireAdmin();
    await connectDB();

    const updateData: Record<string, unknown> = { ...data };

    if (data.name) {
      const slug = slugify(data.name);
      const existingSlug = await Category.findOne({
        slug,
        _id: { $ne: categoryId },
      });
      if (existingSlug) {
        return {
          success: false,
          error: "A category with this name already exists",
        };
      }
      updateData.slug = slug;
    }

    await Category.findByIdAndUpdate(categoryId, updateData);

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Update category error:", error);
    return { success: false, error: "Failed to update category" };
  }
}

// ==================== ORDER ACTIONS ====================

export async function updateOrderStatus(
  orderId: string,
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED",
  notes?: string,
) {
  try {
    await requireAdmin();
    await connectDB();

    const updateData: Record<string, unknown> = { status };

    if (notes) {
      updateData.notes = notes;
    }

    // Add timestamps based on status
    switch (status) {
      case "SHIPPED":
        updateData.shippedAt = new Date();
        break;
      case "DELIVERED":
        updateData.deliveredAt = new Date();
        break;
      case "CANCELLED":
        updateData.cancelledAt = new Date();
        break;
    }

    await Order.findByIdAndUpdate(orderId, updateData);

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/account/orders");
    return { success: true };
  } catch (error) {
    console.error("Update order status error:", error);
    return { success: false, error: "Failed to update order status" };
  }
}

// ==================== COUPON ACTIONS ====================

export async function createCoupon(data: {
  code: string;
  description?: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minPurchase?: number | null;
  maxDiscount?: number | null;
  usageLimit?: number | null;
  perUserLimit?: number;
  validFrom: Date;
  validTo: Date;
  active?: boolean;
}) {
  try {
    await requireAdmin();
    await connectDB();

    const existingCode = await Coupon.findOne({
      code: data.code.toUpperCase(),
    });

    if (existingCode) {
      return {
        success: false,
        error: "A coupon with this code already exists",
      };
    }

    const coupon = await Coupon.create({
      ...data,
      code: data.code.toUpperCase(),
      minPurchase: data.minPurchase ?? undefined,
      maxDiscount: data.maxDiscount ?? undefined,
      usageLimit: data.usageLimit ?? undefined,
    });

    revalidatePath("/admin/coupons");
    return { success: true, coupon: { id: coupon._id.toString() } };
  } catch (error) {
    console.error("Create coupon error:", error);
    return { success: false, error: "Failed to create coupon" };
  }
}

export async function toggleCouponStatus(couponId: string, active: boolean) {
  try {
    await requireAdmin();
    await connectDB();

    await Coupon.findByIdAndUpdate(couponId, { active });

    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error) {
    console.error("Toggle coupon status error:", error);
    return { success: false, error: "Failed to update coupon status" };
  }
}
