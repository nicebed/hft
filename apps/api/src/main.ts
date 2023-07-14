import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new Logger('apps/api::bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  await app.listen(port);

  logger.debug(process.env.NODE_ENV === 'production' ? await app.getUrl() : `http://localhost:${port}`);
}

bootstrap();
