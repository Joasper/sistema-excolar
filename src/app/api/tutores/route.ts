import { NextResponse, NextRequest } from "next/server";
import Tutores from "@/models/Tutores";
import TutorEstudiante from "@/models/TutorEstudiante";
import { ConeccionBD } from "@/utils/mongoose";

interface Tutor {
  _id: string;
  Cedula: string;
  Nombre: string;
  Apellido: string;
  Telefono: string;
}

export async function GET(request: NextRequest) {
  const tutores = await TutorEstudiante.find()
    .populate("IDEstudiante")
    .populate("IDTutor");
  try {
    if (tutores == null || undefined) {
      return new NextResponse("No se encontraron tutores", {
        status: 404,
      });
    }
    return NextResponse.json(tutores);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Mensaje: "No se encontraron los tutores, por favor intente de nuevo",
    });
  }
}

export async function POST(request: NextRequest) {
  await ConeccionBD();
  try {
    const data: Tutor = await request.json();
    const tutor = await new Tutores(data);
    const relacionTutorEstudiante = await new TutorEstudiante({
      IDTutor: tutor._id,
      IDEstudiante: ["656341bc89faef99d5894f28", "6563a5a8106a6dbd21a1c8f1"],
    });
    const result = await tutor.save();
    const relacionResult = await relacionTutorEstudiante.save();

    console.log(tutor);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Mensaje: "No se pudo crear el tutor",
    });
  }
}
