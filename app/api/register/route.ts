// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json({ message: "All fields required" }, { status: 400 });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "Account created!" }, { status: 201 });

  } catch (err: any) {
    // Show real error in terminal so you can diagnose
    console.error("❌ Register API error:", err?.message || err);

    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      { message: isDev ? err?.message || "Server error" : "Server error" },
      { status: 500 }
    );
  }
}