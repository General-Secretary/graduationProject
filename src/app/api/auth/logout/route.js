import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // حذف التوكن
    path: "/",
  });

  response.cookies.set("role", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("id", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  console.log("done");
  return response;
}
