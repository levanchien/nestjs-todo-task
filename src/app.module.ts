import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'localhost',
      port: 3306,
      username: 'sa',
      password: '123',
      database: 'todo_task',
      define: {
        timestamps: false,
        underscored: true
      },
      models: [

      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
