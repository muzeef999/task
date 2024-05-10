import connect from "@/config/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  await connect();

  const { email, password } = await request.json();
  try {
    const existingUser = await UserModel.findOne({ email });
    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.SECRET_key
      );

      const response = NextResponse.json(token, { status: 200 });

      response.cookies.set("token", token, { httpOnly: true, path: "/" });

      return response;
    } else {
      return new NextResponse("invalid credential", { status: 400 });
    }
  } catch (error) {
    console.log(error, "this is error page");
    return new NextResponse("errror ", { status: 500 });
  }
};

export async function PUT(request) {
  try {
    await connect();
    const { userId, followers } = await request.json();

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { followers },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(JSON.stringify("user not found"), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify("Database Error" + err), {
      status: 500,
    });
  }
}
