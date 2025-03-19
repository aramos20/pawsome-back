import fastify from 'fastify';
import { createRoles } from "./config/rolesConfig.js";
import { indexRoutes } from './routes/indexRoutes.js'

const app = fastify({
  logger: true
})

// Crear roles de usuario
createRoles();

//express json middleware y middleware de rutas
// Registrar rutas
app.register(indexRoutes);


// connectDB()

export default app