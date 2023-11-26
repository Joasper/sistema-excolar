import { NextResponse, NextRequest } from "next/server";

export function GET(request) {
  return NextResponse.json({
    message: "Hello Next.js!",
  });
}
