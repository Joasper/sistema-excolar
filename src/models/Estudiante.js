import { Schema, model, models } from "mongoose";

const estudianteSchema = new Schema(
  {
    Matricula: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 1,
      maxlength: 20,
    },

    Nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 20,
    },
    Apellido: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 20,
    },
    Edad: {
      type: Number,
      required: true,
      trim: true,
      min: 1,
      max: 20,
    },
    Inscripto: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.Estudiante || model("Estudiante", estudianteSchema);
