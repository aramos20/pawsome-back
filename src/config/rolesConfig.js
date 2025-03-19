import Settings from "../models/Settings.js";

// Definir los roles de usuario
export const userRoles = {
  1: "bloqueado",
  2: "user",
  3: "volunteer",
  4: "adminRefugee",
  5: "superAdmin",
};

// Función para insertar los roles en la base de datos si no existen
export const createRoles = async () => {
  const exists = await Settings.findOne({ label: "user_roles" });
  if (!exists) {
    await Settings.create({ label: "user_roles", value: userRoles });
    console.log("Roles de usuario creados en la base de datos.");
  }
};
