import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = registerSchema
      .pick({
        name: true,
        email: true,
        password: true,
      })
      .parse(body);

    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email: validated.email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 },
      );
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

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 },
    );
  }
}
