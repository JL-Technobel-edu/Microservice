import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = (new ConfigService()).get('PORT');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../src/uploads'));
  app.setGlobalPrefix('v1/api');  
  //app.use(cookieParser());
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true,transform:true  }));

  const config = new DocumentBuilder()
    .setTitle('Atlas Project')
    .setDescription('The Atlas API description')
    .setVersion('1.0')
    .addTag('atlas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}
bootstrap();
