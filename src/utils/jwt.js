import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" }); // Token expira en 1 hora
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};