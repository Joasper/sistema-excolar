import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    Mensaje: "Esto es un tutor",
  });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({
    Mensaje: "Esto es un tutor",
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    Mensaje: "Esto es un tutor",
  });
}
