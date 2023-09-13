import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.json({ limit: '500mb' }));
  app.use(express.urlencoded({ limit: '500mb', extended: true }));
  app.use('/uploads', express.static('uploads'));
  await app.listen(3333);
}
bootstrap();
