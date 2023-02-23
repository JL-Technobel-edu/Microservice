import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { HousingModule } from './housing.module';
import * as mongoose from 'mongoose'


async function bootstrap() {
  const PORT = (new ConfigService()).get('PORT');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HousingModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: PORT
    }
  } as TcpOptions);
  mongoose.set('debug',true)


  //app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen();
  Logger.log(`Housing microservice running on port ${PORT}`);
}
bootstrap();
