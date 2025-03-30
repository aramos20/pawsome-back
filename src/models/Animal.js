import mongoose, { Schema } from "mongoose";
import healthSchema from "./Health";
import fosterSchema from "./Foster";
import adoptionSchema from "./Adoption";

//FIXME: añadir avisos en los campos no requeridos pero sin datos / aviso general - completa el perfil (campos que faltan)
//-TODO: utils - formateo de fecha tipo dd/mm/yyyy - en todos los campos de fecha
// Implementar en Frontend - desplegable / checkbox -> tipo tag/label - + textarea (otro)

const animalSchema = new Schema(
  {
    refugeeId: {
      type: Schema.Types.ObjectId,
      ref: "Refugee",
      required: [true, "Por favor, inserta el refugio"],
      default: null, // FIXME: asignar el refugio por defecto del usuario logueado + validación del usuario es autorizado para completar registro de animales (middleware)
    },
    name: {
      //textarea
      type: String,
      required: [true, "Por favor, inserta el nombre del animal"],
    },
    species: {
      //desplegable / label seleccionable con opciones (perro/gato/otro)
      type: String,
      required: [true, "Por favor, inserta la especie del animal"],
      //FIXME: añadir validación de "otro" - si se selecciona, añadir campo de texto para especificar
      enum: ["perro", "gato", "otro"], //enum solo permite estos valores
    },
    breed: {
      //autocompletable - sugerencias por texto en input - opcíon desconocido o mixto
      type: String,
      required: [true, "Por favor, inserta la raza del animal"],
    },
    age: {
      //input num edad + autocompletable según edad del input (Cachorro (0-1 año), Joven (1-5 años), Adulto (5-10 años),Senior (más de 10 años))
      type: Number,
      required: [true, "Por favor, inserta la edad del animal"],
    },
    //Automaticamente se asigna la categoría de edad según la edad del animal
    ageCategory: {
      type: String,
      enum: ["cachorro", "joven", "adulto", "senior"],
      default: function () {
        if (this.age < 1) return "cachorro";
        if (this.age < 5) return "joven";
        if (this.age < 10) return "adulto";
        return "senior";
      },
    },
    sex: {
      //desplegable / checkbox -> tipo tag con opciones (macho/hembra/desconocido)
      type: String,
      required: [true, "Por favor, inserta el sexo del animal"],
      enum: ["macho", "hembra", "desconocido"], //aviso si selecciona desconocido
    },
    size: {
      //desplegable / checkbox -> tipo tag - con opciones (pequeño/mediano/grande)
      required: [true, "Por favor, inserta el tamaño del animal"],
      type: String,
    },
    personality: {
      //desplegable / checkbox -> tipo tag - ( “Compatible con otros perros”, “Compatible con gatos”,“Compatible con niños”, “Problemas de agresividad”)
      type: String,
    },
    specialNeeds: {
      //textareas - con sugerencias ( “Problemas de comportamiento”, “Necesita atención especial”, “Necesita tratamiento continuo”, "Dieta especial", “Otros” )
      type: String,
    },
    chip: {
      //yes/no - checkbox - opcional
      type: Boolean,
    },
    numberChip: {
      //input num chip - opcional //no se muestra en el perfil del animal
      type: Number,
    },
    description: {
      //textarea - Situación Especial o Historia - Ejemplo: “Fue rescatada de un entorno de maltrato y necesita atención especial”
      type: String,
    },
    health: healthSchema,
    foster: fosterSchema,
    adoption: adoptionSchema,

    image: {
      //input - subir imagen - opcional
      //-TODO: añadir validación de formato de imagen y tamaño máximo
      //FIXME: añadir validación de imagen - si no se sube imagen, añadir imagen por defecto
      type: String,
    },
  },
  //-TODO: comprobar si se registra la fecha al acutalizar
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

animalSchema.index({
  name: "text",
});

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
