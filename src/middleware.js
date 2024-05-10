import { NextResponse } from "next/server";
const protectedRoutes = ["/dashboard"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  if (protectedRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (token) {
    try {
      if (checkuserData && checkuserData === true) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
