// ✅ userService: Solo se encarga de la lógica de negocio y la base de datos.
// El Service debe manejar la lógica de negocio (validaciones, transformaciones, interacción con la base de datos, etc.).
// ✅ userController: Solo maneja la solicitud y la respuesta HTTP.

import Settings from "../models/Settings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

//-TODO: pensar como se van a asignar los roles - si se pueden añadir mas de un rol a un usuario (ejemplo: voluntario y usuario)
//FIXME: Throw error devuelven 200 - por eso comentado - hacer middlewares error para devolver los mensajes de error en las peticiones

export const validateUserRole = async (role) => {
  const settings = await Settings.findOne({ label: "user_roles" });

  if (!settings) {
    throw new Error("No se encontraron roles en settings");
  }

  const selectedRole = settings.value[role] || settings.value[2]; // Buscar rol por número

  if (!selectedRole) {
    throw new Error("Rol no válido");
  }

  return selectedRole;
};

export const createUser = async ({
  nickname,
  email,
  password,
  role,
}) => {
  try {
    if (!nickname || !email || !password) {
      throw new Error("Faltan datos obligatorios");
      // return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const selectedRole = await validateUserRole(role); // Validar rol usando la función del servicio

    const formattedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nickname,
      email: formattedEmail,
      password: hashedPassword,
      role: selectedRole || "user", //si no se selecciona un rol, se asigna por defecto el de usuario
    });

    return await newUser.save(); //crea un nuevo usuario (documento) en la base de datos
    //newUser es un objeto de Mongoose basado en el modelo User. Contiene todos los datos del usuario (name, email, password, etc.). Al hacer save() se guarda en la base de datos.
    // .save() es un método de Mongoose que inserta el documento en MongoDB.
  } catch (err) {
    throw new Error("Error en createUser: " + err.message);
  }
};

export const login = async (email, password) => {
  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    // Generar token JWT
    const token = generateToken(user._id);

    // Devolver el token y la información del usuario (sin la contraseña)
    return {
      token,
      user,
    };
  } catch (err) {
    throw new Error("Error en loginUser: " + err.message);
  }
};

export const getUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw new Error("Error en getUsers:", err.message);
  }
};

export const getById = async (id) => {
  try {
    return await User.findById(id);
  } catch (err) {
    //console.error("Error en getById:", error);
    throw new Error("Error en getById: ", err.message);
  }
};

//FIXME: devuelve todos los usuarios, no solo uno
//lógica para obtener un usuario por email
export const getByEmail = async (email) => {
  try {
    console.log("🟠 loginUser Controller", email);

    return await User.findOne({ email });
    // return await User.findOne({ email: req.body.email });
  } catch (err) {
    throw new Error("Error en getByEmail: ", err);
  }
};

// export { getUsers, getByEmail, getById };
