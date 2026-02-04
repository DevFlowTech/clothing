import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// User Schema (simplified for seeding)
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    emailVerified: Date,
    password: String,
    image: String,
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function seed() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("❌ MONGODB_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Admin user credentials
    const adminEmail = "admin@devflow.com";
    const adminPassword = "Admin@123";
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists, updating password...");
      await User.updateOne(
        { email: adminEmail },
        {
          password: hashedPassword,
          role: "ADMIN",
          name: "Admin User",
        },
      );
      console.log("✅ Admin password updated");
    } else {
      // Create admin user
      await User.create({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      });
      console.log("✅ Admin user created");
    }

    // Create a demo regular user
    const demoEmail = "demo@devflow.com";
    const demoPassword = "Demo@123";
    const hashedDemoPassword = await bcrypt.hash(demoPassword, 12);

    const existingDemo = await User.findOne({ email: demoEmail });

    if (!existingDemo) {
      await User.create({
        name: "Demo User",
        email: demoEmail,
        password: hashedDemoPassword,
        role: "USER",
        emailVerified: new Date(),
      });
      console.log("✅ Demo user created");
    }

    console.log("\n📋 Login Credentials:");
    console.log("┌─────────────────────────────────────────┐");
    console.log("│  ADMIN                                  │");
    console.log("│  Email:    admin@devflow.com              │");
    console.log("│  Password: Admin@123                    │");
    console.log("├─────────────────────────────────────────┤");
    console.log("│  DEMO USER                              │");
    console.log("│  Email:    demo@devflow.com               │");
    console.log("│  Password: Demo@123                     │");
    console.log("└─────────────────────────────────────────┘");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
  }
}

seed();
