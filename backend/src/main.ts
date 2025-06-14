import Fastify from 'fastify';
import { app } from './app/app';
import fastifyCors from '@fastify/cors';
import FastifyJWT from '@fastify/jwt';
import multer from 'fastify-multer';
import fastifyOAuth2 from 'fastify-oauth2';

const host = process.env.HOST ?? '0.0.0.0';


const port =  3004;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

server.register(multer.contentParser);

                                                                                

server.register(app);
server.register(fastifyCors, {
  origin: 'http://localhost:5173', // Allow this origin
  methods: '*', // Allow POST and OPTIONS methods
  allowedHeaders: '*', // Allow Content-Type header
});
server.register(FastifyJWT, {
  secret: 'chitfund',
});



// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);

    process.exit(1);
  } else {
   
    console.log(`[ ready ] http://${host}:${port}`);
    console.log(server.printRoutes());

  }
});
