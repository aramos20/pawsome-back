// ✅ userService: Solo se encarga de la lógica de negocio y la base de datos.
// ✅ userController: Solo maneja la solicitud y la respuesta HTTP.
// El Controller debe manejar solo la interacción con el cliente (recibir la solicitud y enviar la respuesta HTTP).

import jwt from "jsonwebtoken";
import { login, createUser, getUsers, getByEmail, getById } from "../services/userService.js";

//-TODO: Añadir validaciones de datos
//-TODO: Probar el registro de usuarios
//FIXME: que los errores devuelvan el error concreto en postman - hacer middlewares error para devolver los mensajes de error en las peticiones

const registerUser = async (req, reply) => {
  try {
    const { nickname, email, password, role } = req.body;
    const newUser = await createUser({
      // Llamar al servicio para crear el usuario con el rol correcto
      nickname,
      email,
      password,
      role,
    });

    return reply
      .status(201)
      .send({ message: "Usuario registrado con exito", newUser });
  } catch (err) {
    console.error("Error al crear el usuario:", err);
    reply.status(500).json({ message: err });
  }
};

//-TODO: terminar login
//-TODO: Probar el login

const loginUser = async (req, reply) => {
  try {
    // Verificar que req.body existe y tiene las propiedades esperadas
    if (!req.body || !req.body.email || !req.body.password) {
      throw new Error("Faltan datos obligatorios");
    }
    const { email, password } = req.body;
    // Llamar al Service para autenticar al usuario
    const { token, user } = await login(email, password);

    if (user.tokens.length > 4) user.tokens.shift();
    user.tokens.push(token);
    await user.save();
    reply.send({ message: "Bienvenid@ " + user.nickname, token });
  } catch (err) {
    console.error("Error al hacer login:", err);
    reply.status(500).send({ message: err });
  }
};

const getAllUsers = async (req, reply) => {
  try {
    const users = await getUsers(); //find
    if (!users) {
      return reply.status(404).send({ error: "No hay usuarios registrados" });
    }
    return reply.status(200).send(users);
  } catch (err) {
    console.error("Error al obtener los usuarios:", err);
    return reply
      .status(500)
      .send({ error: "Error al obtener los usuarios", message: err.message });
  }
};

const getUserById = async (req, reply) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(id);
  try {
    if (!id) {
      return reply
        .status(400)
        .send({ error: "Id de usuario no proporcionado" });
    }
    const user = await getById(id);
    console.log("user", user);
    if (!user) {
      return reply.status(404).send({ error: "Usuario no encontrado" });
    }
    return reply.status(200).send(user);
  } catch (err) {
    console.error("Error al obtener el usuario:", err);
    return reply
      .status(500)
      .send({ error: "Error al obtener el usuario", message: err.message });
  }
};

//FIXME: devuelve todos los usuarios, no solo uno
const getUserByEmail = async (req, reply) => {
  try {
    const { email } = req.params;
    const user = await getByEmail(email);
    console.log(user);
    if (!user) {
      return reply.status(404).send({ error: "Usuario no encontrado" });
    }

    return reply.status(200).send(user);
  } catch (err) {
    console.error("Error al obtener el usuario:", err);
    return reply
      .status(500)
      .send({ error: "Error al obtener el usuario", message: err.message });
  }
};

export const userController = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
};
