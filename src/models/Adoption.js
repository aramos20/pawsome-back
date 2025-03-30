import mongoose, { Schema } from "mongoose";

//-TODO: utils - formateo de fecha tipo dd/mm/yyyy - en todos los campos de fecha
// Implementar en Frontend - desplegable / checkbox -> tipo tag/label - + textarea (otro)   
//-TODO: date y contact - requeridos si status es "adopción en proceso"/"adoptado"

const adoptionSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["disponible", "adopción en proceso", "adoptado"],
      default: "disponible",
    },
    date: Date,
    contact: String,
  },
  { _id: false }
);

const Adoption  = mongoose.model("Adotpion", adoptionSchema) 

export default Adoption;
