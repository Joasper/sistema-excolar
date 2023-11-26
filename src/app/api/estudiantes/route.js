import { NextResponse, NextRequest } from "next/server";
import { ConeccionBD } from "../../../utils/mongoose";
import Estudiante from "../../../models/Estudiante";

export async function GET(request) {
  await ConeccionBD();
  const estudiantes = await Estudiante.find();
  return NextResponse.json(estudiantes, {
    status: 200,
  });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const estudiante = new Estudiante(data);
    const validarMatricula = await Estudiante.findOne({
      Matricula: data.Matricula,
    });
    if (validarMatricula) {
      return NextResponse.json(
        {
          message: "Matricula ya existe",
        },
        {
          status: 400,
        }
      );
    } else if (estudiante.Matricula == null || undefined) {
      return NextResponse.json(
        {
          message: "La matricula es obligatoria",
        },
        {
          status: 400,
        }
      );
    }

    const estudianteGuardado = await estudiante.save();

    console.log(data, estudiante);

    return NextResponse.json(estudianteGuardado);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Error: "No se pudo crear el estudiante",
    });
  }
}
