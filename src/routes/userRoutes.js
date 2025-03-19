import { userController } from "../controllers/userController.js";
const { registerUser, loginUser, getAllUsers, getUserByEmail, getUserById } = userController;
//console.log(getAllUsers);

const userRoutes = async (fastify, options) => {
  fastify.post("/", registerUser);
  fastify.post("/login", loginUser);
  fastify.get("/", getAllUsers);
  fastify.get("/id/:id", getUserById);
  fastify.get("/email/:email", getUserByEmail);

};

export { userRoutes };
