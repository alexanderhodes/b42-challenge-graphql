import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true
  });
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3010);
}
bootstrap();
