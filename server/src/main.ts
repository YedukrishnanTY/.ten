
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require('express');
const serverless = require('serverless-http');

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.init();
}

bootstrap().catch(err => {
  console.error('Nest bootstrap error', err);
});

export const handler = serverless(expressApp);

