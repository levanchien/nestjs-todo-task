import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '123',
      database: 'todo_task',
      define: {
        timestamps: false,
        underscored: true
      },
      autoLoadModels: true,
      synchronize: true,
      models: [
        User,
        Task
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
