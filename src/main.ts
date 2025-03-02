import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/env.var';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  console.log(envs)
  const app = await NestFactory.create(AppModule,{
    rawBody: true
  });
  app.useGlobalPipes(new ValidationPipe())
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options:{
      servers:[envs.nats_servers]
    }
  },
{inheritAppConfig:true,});
  
  await app.startAllMicroservices();
  await app.listen(envs.port);
}
bootstrap();
