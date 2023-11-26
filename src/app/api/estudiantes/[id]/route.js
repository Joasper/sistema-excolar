import { ConeccionBD } from "@/utils/mongoose";
import Estudiante from "../../../../models/Estudiante";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await ConeccionBD();
    const estudiante = await Estudiante.findById(params.id);
    if (estudiante == null || undefined) {
      return NextResponse.json({
        message: "Estudiante no encontrado",
      });
    }
    console.log(estudiante);
    return NextResponse.json(estudiante, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Error: "No se pudo obtener el estudiante",
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const verificarMatriculaActualizada = await Estudiante.findOne({
      Matricula: data.Matricula,
    });
    console.log(data, verificarMatriculaActualizada);
    if (verificarMatriculaActualizada) {
      return NextResponse.json({
        message: "La matricula ya le pertenece a un estudiante",
      });
    }
    const estudiante = await Estudiante.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (estudiante == null || undefined) {
      return NextResponse.json({
        message: "Estudiante no encontrado",
      });
    }
    return NextResponse.json(estudiante);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Error: "No se pudo actualizar el estudiante",
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const estudiante = await Estudiante.findByIdAndDelete(params.id);
    if (estudiante == null || undefined) {
      return NextResponse.json({
        message: "Estudiante no encontrado",
      });
    }
    return NextResponse.json({
      Mensaje: `Estudiante eliminado correctamente`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Error: "No se pudo eliminar el estudiante",
    });
  }
}
