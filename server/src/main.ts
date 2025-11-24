import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let handler: any = null;

async function createHandler() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.init();
  // get underlying express instance that Nest uses
  const server = app.getHttpAdapter().getInstance();
  return async (req, res) => server(req, res);
}

export default async function (req, res) {
  try {
    if (!handler) handler = await createHandler();
    return handler(req, res);
  } catch (err) {
    console.error('server handler error', err);
    res.statusCode = 500;
    res.end('Server error');
  }
}
