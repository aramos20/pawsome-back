import mongoose, { Schema } from "mongoose";

//FIXME: añadir avisos en los campos no requeridos pero sin datos / aviso general - completa el perfil (campos que faltan)
//-TODO: utils - formateo de fecha tipo dd/mm/yyyy - en todos los campos de fecha
// Implementar en Frontend - desplegable / checkbox -> tipo tag/label - + textarea (otro)


const healthSchema = new Schema(
  {
    healthStatus: {
      type: String,
      //FIXME: añadir validación de "otro" - si se selecciona, añadir campo de texto para especificar
      enum: ["sano", "enfermo", "lesionado", "otro"], //enum solo permite estos valores 
      default: "sano",
      // required: [true, "Por favor, inserta el estado de salud del animal"],
    },
    sterilization: {
      status: {
        type: String,
        enum: ["sí", "no", "desconocido"],
        default: "desconocido",
      },
      type: { type: String, enum: ["castración", "esterilización"] },
      date: Date, // Fecha de esterilización
    },
    vaccination: {
      status: {
        type: String,
        enum: ["sí", "no", "desconocido"],
        default: "desconocido",
      },
      types: [
        {
          type: String,
          enum: [
            "rabia",
            "moquillo",
            "hepatitis",
            "parvovirus",
            "leptospirosis",
            "tos de las perreras",
            "coronavirus",
            "parainfluenza",
            "leucemia",
            "panleucopenia",
            "rinotraqueitis",
            "calicivirus",
            "clamidiasis",
            "otras",
          ],
        },
      ],
      lastDate: Date,
      nextDate: Date,
    },
    deworming: {
      status: {
        type: String,
        enum: ["sí", "no", "desconocido"],
        default: "desconocido",
      },
      type: { type: String, enum: ["collar", "pastillas", "pipetas"] },
      lastDate: Date, // Última fecha de desparasitación
      nextDate: Date, // Próxima fecha de desparasitación (recordatorio)
    },
    healthProblems: [
      {
        typeProblem: {
          type: String,
          enum: [
            "diabetes",
            "problemas de movilidad",
            "ciego",
            "sordo",
            "diabético",
            "problemas renales",
            "otro",
          ],
        },
        description: String, // Descripción del problema
      },
    ],
    injuries: [
      {
        typeInjury: {
          type: String,
          enum: ["fractura", "herida", "quemadura", "otra"],
        },
        description: String, // Descripción de la lesión
        date: Date, // Fecha de la lesión
      },
    ],
    leishmaniosis: { type: Boolean, default: false },
    felineImmunodeficiency: { type: Boolean, default: false },
    medicalHistory: String, // textarea - Historial médico general 
    files: [String], // URLs de archivos (informes, analíticas, radiografías, etc.)
  },
  { _id: false }
);

const Health = mongoose.model("Health", healthSchema)

export default Health;
