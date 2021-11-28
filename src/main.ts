import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as packageInfo from '../package.json';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Documentation
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Back End PIO')
        .setDescription(packageInfo.description)
        .setVersion(packageInfo.version)
        .build(),
    ),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
