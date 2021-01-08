import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskEntity } from 'src/entities/task.entity';

@Module({
  imports: [SequelizeModule.forFeature([TaskEntity])],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
