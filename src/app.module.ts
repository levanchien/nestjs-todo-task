import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { databaseConfig } from './config/database.config';
import { TaskModule } from './core/task/task.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
