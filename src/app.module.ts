import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './config/database.config';
import { AppApiModule } from './app-api/app-api.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    AppApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
