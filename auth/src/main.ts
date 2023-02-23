import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
//import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const PORT = (new ConfigService()).get('PORT');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: PORT
    }
  } as TcpOptions);
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen();
  Logger.log(`User microservice running on port ${PORT}`);
}
bootstrap();
