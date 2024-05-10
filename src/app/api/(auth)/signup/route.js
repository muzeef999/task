import connect from "@/config/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  await connect();

  const { firstName, lastName, email, password, phoneNumber, username } =
    await request.json();
  const hashedpassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return new NextResponse("user already exist", { status: 400 });
    } else {
      const newuser = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedpassword,
        phoneNumber,
        username,
      });

      const token = await jwt.sign(
        { userId: newuser._id },
        process.env.SECRET_key
      );

      if (!token) {
        throw new Error("failed to generate token");
      }
      const response = NextResponse.json({
        message: "login succeess",
        success: true,
      });
      response.cookies.set("token", token, { httpOnly: true, path: "/" });
      return response;
    }
  } catch (error) {
    console.log("Error" + error);
    return new NextResponse("Database Error " + error, { status: 500 });
  }
};
