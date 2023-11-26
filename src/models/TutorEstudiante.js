import { Schema, model, models } from "mongoose";

const TutorEstudianteSchema = new Schema({
  IDTutor: {
    type: Schema.Types.ObjectId,
    ref: "Tutores",
    required: true,
  },
  IDEstudiante: [
    {
      type: Schema.Types.ObjectId,
      ref: "Estudiante",
      required: true,
    },
  ],
});

export default models.TutorEstudiante ||
  model("TutorEstudiante", TutorEstudianteSchema);
