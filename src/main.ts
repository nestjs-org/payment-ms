import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/env.var';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(envs)
  const app = await NestFactory.create(AppModule,{
    rawBody: true
  });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(envs.port);
}
bootstrap();
