import { NextResponse, NextRequest } from "next/server";
import Tutores from "@/models/Tutores";
import TutorEstudiante from "@/models/TutorEstudiante";
import { ConeccionBD } from "@/utils/mongoose";
import Estudiante from "@/models/Estudiante";

interface Tutor {
  _id: string;
  Cedula: string;
  Nombre: string;
  Apellido: string;
  Telefono: string;
}

export async function GET(request: NextRequest) {
  let tutores = await TutorEstudiante.find()
    .populate("IDEstudiante")
    .populate("IDTutor");
  tutores.reverse();

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
    console.log(tutor);

    let relacionTutorEstudiante = await new TutorEstudiante({
      IDTutor: [tutor._id],
      IDEstudiante: ["6563da096c4a6b78177b5f7d"],
    });

    if (relacionTutorEstudiante.IDTutor) {
      const tutorExistente = await Tutores.findOne({
        Cedula: data.Cedula,
      });
      const estudianteExistente = await Estudiante.findById(
        relacionTutorEstudiante.IDEstudiante
      );
      if (estudianteExistente)
        return NextResponse.json({
          Mensaje: `El estudiante ${estudianteExistente.Nombre} matricula: ${estudianteExistente.Matricula} ya esta asociado a este tutor`,
        });
      console.log(tutorExistente);
      if (tutorExistente) {
        relacionTutorEstudiante.IDTutor = tutorExistente._id;
        await relacionTutorEstudiante.save();
        return NextResponse.json({
          Mensaje: "Estudiante registrado con exito",
        });
      }
    }
    if (tutor.Cedula.length > 13 || tutor.Cedula.length < 12)
      return NextResponse.json({
        Mensaje: "Cedula incorrecta",
      });
    await relacionTutorEstudiante.save();
    const result = await tutor.save();

    //console.log(tutor);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Mensaje: "No se pudo crear el tutor",
    });
  }
}
