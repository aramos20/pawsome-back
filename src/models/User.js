import { Schema } from "mongoose";

//FIXME: añadir avisos en los campos no requeridos pero sin datos / aviso general - completa el perfil (campos que faltan

// Esquema de Mongoose
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    last_name: { type: String },
    nickname: {
      type: String,
      required: [true, "Por favor, inserta tu nombre de usuario"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Por favor, inserta un email válido"],
      unique: [true, "Por favor, inserta un email único"],
      required: [true, "Por favor, inserta tu email"],
    },
    password: {
      //añadir regex + validacion
      type: String,
      required: [true, "Por favor, inserta tu constraseña"],
    },
    birthday: {
      type: Date,
    },
    phone: {
      type: String,
      match: [
        /^\+34\s?\d{2}\s?\d{3}\s?\d{3}$/, // Expresión regular para números de España
        "Por favor, inserte un número de teléfono válido (e.g., +34 612 345 678)",
      ],
    },
    image: String,
    tokens: [{ type: String }],
    role: {
      type: String,
      enum: [], // Se llenará dinámicamente
      //enum: ["user", "volunteer", "refugee", "superAdmin"], // Quitamos enum y validamos antes de guardar
      default: "user",
    },
    refugeeId: { type: Schema.Types.ObjectId, ref: "User", default: null }, // Solo para asociar volunteers al refugee
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

userSchema.methods.toJSON = function () {
  // Le decimos que no nos devuelva en el documento ni los tokens ni las contraseñas (Es solo para cuando hagas un get info del usuario no aparezcan pero sigue en base de datos)
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
};

userSchema.index({
  name: "text",
});

// Exportar modelo
const User = mongoose.model("User", userSchema);

export default User;
