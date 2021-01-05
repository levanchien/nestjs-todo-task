import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadConfig } from './config';
import { AllExceptionsFilter } from './exception/all-exception-filter.exception';
import * as session from 'express-session';
import * as passport from 'passport';
import { APP_SECRET } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  loadConfig();

  app.use(session({
    secret: APP_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
