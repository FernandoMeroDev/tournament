/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 *  ‼️‼️‼️‼️‼️‼️No tocar, no tengo idea de como funciona esto, trate de entenderlo y dejo de funcionar
 * solo funciona si no lo entiendes, asique no intenets comprenderlo ‼️‼️‼️‼️‼️‼️
 * XD
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const globalPrefix = 'api';
  const config = new DocumentBuilder()
    .setTitle('Tournament API')
    .setDescription(' Documentacion de las apis de Tournament')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'bearer'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  // Habilita las cords
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  console.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  console.log(`documentacion de la api http://localhost:${port}/api-doc`);
}

bootstrap();
