"use server";

import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User, Address, Wishlist, Review, Order } from "@/lib/models";
import {
  registerSchema,
  updateProfileSchema,
  addressSchema,
} from "@/lib/validations";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ==================== AUTH ACTIONS ====================

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const validated = registerSchema
      .pick({ name: true, email: true, password: true })
      .parse(data);

    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email: validated.email });

    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 12);

    // Create user
    const user = await User.create({
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      role: "USER",
    });

    return {
      success: true,
      user: { id: user._id.toString(), email: user.email },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Failed to create account" };
  }
}

export async function updateProfile(data: { name: string; phone?: string }) {
  try {
    const user = await requireAuth();
    const validated = updateProfileSchema.parse(data);

    await connectDB();

    await User.findByIdAndUpdate(user.id, {
      name: validated.name,
      phone: validated.phone || null,
    });

    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

// ==================== ADDRESS ACTIONS ====================

export async function createAddress(data: {
  label?: string;
  name: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}) {
  try {
    const user = await requireAuth();
    const validated = addressSchema.parse(data);

    await connectDB();

    // If setting as default, unset other defaults
    if (validated.isDefault) {
      await Address.updateMany({ userId: user.id }, { isDefault: false });
    }

    const address = await Address.create({
      ...validated,
      userId: user.id,
    });

    revalidatePath("/account/addresses");
    revalidatePath("/checkout");
    return { success: true, address: { id: address._id.toString() } };
  } catch (error) {
    console.error("Create address error:", error);
    return { success: false, error: "Failed to create address" };
  }
}

export async function updateAddress(
  addressId: string,
  data: {
    label?: string;
    name: string;
    phone: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault?: boolean;
  },
) {
  try {
    const user = await requireAuth();
    const validated = addressSchema.parse(data);

    await connectDB();

    // Verify ownership
    const existing = await Address.findOne({ _id: addressId, userId: user.id });

    if (!existing) {
      return { success: false, error: "Address not found" };
    }

    // If setting as default, unset other defaults
    if (validated.isDefault) {
      await Address.updateMany(
        { userId: user.id, _id: { $ne: addressId } },
        { isDefault: false },
      );
    }

    await Address.findByIdAndUpdate(addressId, validated);

    revalidatePath("/account/addresses");
    revalidatePath("/checkout");
    return { success: true };
  } catch (error) {
    console.error("Update address error:", error);
    return { success: false, error: "Failed to update address" };
  }
}

export async function deleteAddress(addressId: string) {
  try {
    const user = await requireAuth();

    await connectDB();

    // Verify ownership
    const existing = await Address.findOne({ _id: addressId, userId: user.id });

    if (!existing) {
      return { success: false, error: "Address not found" };
    }

    await Address.findByIdAndDelete(addressId);

    revalidatePath("/account/addresses");
    revalidatePath("/checkout");
    return { success: true };
  } catch (error) {
    console.error("Delete address error:", error);
    return { success: false, error: "Failed to delete address" };
  }
}

// ==================== WISHLIST ACTIONS ====================

export async function addToWishlist(productId: string) {
  try {
    const user = await requireAuth();

    await connectDB();

    const existing = await Wishlist.findOne({ userId: user.id, productId });

    if (existing) {
      return { success: true, message: "Already in wishlist" };
    }

    await Wishlist.create({
      userId: user.id,
      productId,
    });

    revalidatePath("/account/wishlist");
    return { success: true };
  } catch (error) {
    console.error("Add to wishlist error:", error);
    return { success: false, error: "Failed to add to wishlist" };
  }
}

export async function removeFromWishlist(productId: string) {
  try {
    const user = await requireAuth();

    await connectDB();

    await Wishlist.deleteMany({ userId: user.id, productId });

    revalidatePath("/account/wishlist");
    return { success: true };
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    return { success: false, error: "Failed to remove from wishlist" };
  }
}

// ==================== REVIEW ACTIONS ====================

export async function createReview(data: {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
}) {
  try {
    const user = await requireAuth();

    await connectDB();

    // Check if already reviewed
    const existing = await Review.findOne({
      userId: user.id,
      productId: data.productId,
    });

    if (existing) {
      return {
        success: false,
        error: "You have already reviewed this product",
      };
    }

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      userId: user.id,
      status: "DELIVERED",
      "items.productId": data.productId,
    });

    const review = await Review.create({
      userId: user.id,
      productId: data.productId,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      verified: !!hasPurchased,
    });

    revalidatePath(`/products/${data.productId}`);
    return { success: true, review: { id: review._id.toString() } };
  } catch (error) {
    console.error("Create review error:", error);
    return { success: false, error: "Failed to create review" };
  }
}
