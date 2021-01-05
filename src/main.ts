import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadConfig } from './config';
import { AllExceptionsFilter } from './exception/all-exception-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  loadConfig();
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
