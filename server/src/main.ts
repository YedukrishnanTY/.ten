import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(cors({
    origin: ['http://localhost:3000', 'https://ten-bay-beta.vercel.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  await app.listen(3000);
}
bootstrap();
