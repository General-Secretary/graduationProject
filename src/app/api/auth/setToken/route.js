import { NextResponse } from "next/server";

export async function POST(req) {
    const { token, role, rememberMe, id } = await req.json();

    if (!token || !role || !id) {
        return NextResponse.json(
            { message: "Token , role and id required" },
            { status: 400 }
        );
    }

    const response = NextResponse.json({
        message: "Token , role and id set successfully",
    });

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
    });

    response.cookies.set("role", role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
    });

    response.cookies.set("id", id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
    });
    return response;
}
