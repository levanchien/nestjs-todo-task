import { Module } from '@nestjs/common';
import { AppLoggerService } from './my-logger.service';

@Module({
  providers: [AppLoggerService],
  exports: []
})
export class MyLoggerModule {}
