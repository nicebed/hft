import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Module({})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });

  await app.listen(300);
}

bootstrap();
