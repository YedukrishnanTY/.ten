
import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

let appInstance: INestApplication | null = null;
let serverInstance: any = null;

async function createApp() {
  if (appInstance) return appInstance;
  appInstance = await NestFactory.create(AppModule, { logger: false });
  await appInstance.init();
  return appInstance;
}

async function createServer() {
  if (serverInstance) return serverInstance;
  const app = await createApp();
  serverInstance = app.getHttpAdapter().getInstance(); // express or fastify instance
  return serverInstance;
}

// keep this for local dev: `node dist/main.js` or `npm run start:prod`
export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
  console.log('Listening on http://localhost:3000');
}

// only auto-start server when run directly (local dev)
if (require.main === module) {
  bootstrap().catch(err => {
    console.error('Bootstrap error', err);
    process.exit(1);
  });
}

// Vercel / serverless: export a default handler (req, res) that forwards to Nest's underlying server.
// Vercel will import the compiled JS module and look for exports; this ensures one exists.
export default async function handler(req: any, res: any) {
  try {
    const server = await createServer();
    // Express-compatible handler will accept (req, res)
    return server(req, res);
  } catch (err) {
    console.error('Serverless handler error', err);
    res.statusCode = 500;
    res.end('Server error');
  }
}
