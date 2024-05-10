import connect from "@/config/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connect();
  try {
    const alluser = await UserModel.find();
    return new NextResponse(JSON.stringify(alluser), { status: 200 });
  } catch (error) {
    console.log(error, "this is error page");
    return new NextResponse("errror ", { status: 500 });
  }
};
