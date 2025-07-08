// import { NextResponse } from "next/server";
// export async function GET(req) {
//     const token = req.cookies.get("token")?.value || null;
//     const role = req.cookies.get("role")?.value || null;
//     console.log("User token from Cookieeee:", token);
//     console.log("User role from Cookieeeee:", role);
//     return NextResponse.json({ token, role });
// }

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token")?.value || null;
//   const role = cookieStore.get("role")?.value || null;

//   console.log("User token from Cookieeee:", token);
//   console.log("User role from Cookieeeee:", role);

//   return NextResponse.json({ token, role });
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  const role = cookieStore.get("role")?.value || null;
  const id = cookieStore.get("id")?.value || null;

  console.log("User token from Cookieeee:", token);
  console.log("User role from Cookieeeee:", role);
  console.log("User id from Cookieeeee:", id);

  return NextResponse.json({ token, role, id });
}
