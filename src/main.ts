import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/all-exception-filter.exception';
import * as session from 'express-session';
import * as passport from 'passport';
import { APP_SECRET } from './constants/constants';
import { AppLoggerService } from './core/my-logger/my-logger.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { setSqlDatetimeFormat } from './config/database.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: parseInt(process.env.APP_LOG) === 1 ? true : false
  });
  
  setSqlDatetimeFormat();

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

  await app.listen(process.env.APP_PORT);
}
bootstrap();
