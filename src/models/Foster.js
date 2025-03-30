import { Schema } from "mongoose";

//FIXME: añadir avisos en los campos no requeridos pero sin datos / aviso general - completa el perfil (campos que faltan)
//-TODO: utils - formateo de fecha tipo dd/mm/yyyy - en todos los campos de fecha
// Implementar en Frontend - desplegable / checkbox -> tipo tag/label - + textarea (otro)

//Esquema Acogida
const fosterSchema = new Schema(
  {
    status: {
      // En acogida - true/false
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      //FIXME: fecha de inicio de acogida - date - requerido  - solo si status es true
      required: [true, "Por favor, inserta la fecha de inicio de acogida"], 

    },
    //FIXME: fosterEndDateExpected (fecha esperada de fin) - date - fecha de fin de acogida - definido - si se especifica / defautl: null - fecha indefinida, sin fecha de fin (requerido)
    endDateExpected: Date,
    //FIXME: fosterEndDate (fecha fin real) - date - fecha de fin de acogida real. - opcional
    endDateActual: Date,
    // input - contacto de la persona de acogida //TODO: recoger de usuario registrado si es posible
    description: {
      type: String,
      required: [
        true, //si status es true
        "Por favor, inserta una descripción de la situación especial",
      ], //ejemplo: "En acogida temporal por tratamiento médico"
    },
    contact: {
      type: String,
      required: [
        true, //si status es true
        "Por favor, inserta el contacto de la persona de acogida",
      ],
      // match: [
      //     /^\+34\s?\d{2}\s?\d{3}\s?\d{3}$/, // Expresión regular para números de España
      //     "Por favor, inserte un número de teléfono válido (e.g., +34 612 345 678)",
      //   ],
    },
  },
  { _id: false }
);

const Foster = mongoose.model("Foster", fosterSchema)

export default Foster;
