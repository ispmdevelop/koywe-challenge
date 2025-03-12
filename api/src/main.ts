import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // SWAGGER Setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Isaac Paz koyweforest challenge')
    .setDescription('koyweforest challenge Quote API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory(), {
    jsonDocumentUrl: 'docs/json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
