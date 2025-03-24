//import fastify from 'fastify';
import { userRoutes } from './userRoutes.js';

const indexRoutes = async (fastify, options) => {
  fastify.register(userRoutes, { prefix: '/auth' });
};

export { indexRoutes };