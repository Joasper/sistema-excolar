import { NextResponse, NextRequest } from "next/server";
import { ConeccionBD } from "../../../utils/mongoose";
import Estudiante from "../../../models/Estudiante";

export async function GET(request) {
  await ConeccionBD();
  try {
    const estudiantes = (await Estudiante.find()).reverse();
    return NextResponse.json(estudiantes, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "No se encontraron los estudiantes",
      },
      {
        status: 400,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const estudiante = new Estudiante(data);

    if (estudiante.Nombre.length <= 2 || estudiante.Apellido.length <= 2) {
      return NextResponse.json(
        {
          message: "El nombre o apellido debe contener mas de un caracter",
        },
        {
          status: 400,
        }
      );
    }
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
