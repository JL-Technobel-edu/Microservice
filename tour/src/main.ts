import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { TourModule } from './tour.module';



async function bootstrap() {
  const PORT = (new ConfigService()).get('PORT');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TourModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: PORT
    }
  } as TcpOptions);
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen();
  Logger.log(`Tour microservice running on port ${PORT}`);
}
bootstrap();
