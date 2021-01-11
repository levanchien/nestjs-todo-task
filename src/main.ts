import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadConfig } from './config';
import { AllExceptionsFilter } from './common/exceptions/all-exception-filter.exception';
import * as session from 'express-session';
import * as passport from 'passport';
import { APP_SECRET } from './constants/constants';
import { AppLoggerService } from './core/my-logger/my-logger.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });

  loadConfig();

  app.use(session({
    secret: APP_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  
  app.useLogger(AppLoggerService.getInstance());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  /* Dependencies Injection */
  /* Have to import MyLoggerModule, so NestJs create instance  */
  /* app.useLogger(app.get(MyLoggerService)); */

  await app.listen(3000);
}
bootstrap();
