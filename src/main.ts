import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );
  await app.listen(3000);
} 
bootstrap();