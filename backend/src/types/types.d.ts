import 'fastify';

import '@fastify/oauth2';
declare module 'fastify' {
  interface FastifyRequest {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
}



declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: ReturnType<typeof fastifyOAuth2>;
  }
}
