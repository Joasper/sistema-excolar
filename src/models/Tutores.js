import { Schema, model, models } from "mongoose";

const TutoresSchema = new Schema({
  Cedula: {
    type: String,
    required: true,
    trim: true,
    maxlength: 11,
    unique: true,
  },
  Nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  Apellido: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  Telefono: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
});

export default models.Tutores || model("Tutores", TutoresSchema);
