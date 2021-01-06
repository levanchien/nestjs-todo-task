import { Module } from '@nestjs/common';
import { AppApiController } from './app-api.controller';

@Module({
  controllers: [AppApiController],
  imports: [ ]
})
export class AppApiModule {}
