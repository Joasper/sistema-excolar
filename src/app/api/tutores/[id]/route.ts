import TutorEstudiante from "@/models/TutorEstudiante";
import Tutores from "@/models/Tutores";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const tutores = await TutorEstudiante.find({
      IDTutor: params.id,
    })
      .populate("IDTutor")
      .populate("IDEstudiante");

    return NextResponse.json(tutores);
  } catch (error) {}
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
