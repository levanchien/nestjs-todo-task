import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { User } from 'src/core/users/interfaces/user.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { ParsePageQuery } from 'src/common/pipes/page-query.pipe';
import { PageQuery } from 'src/common/interfaces/page-object.interface';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) {}

    @Get()
    search(
        @Query(new ParsePageQuery()) pageQuery: PageQuery,
        @CurrentUser() user: User
    ) {
        return pageQuery ?
            this.taskService.search(pageQuery, user)
            : this.taskService.findAllTasks(user); 
    }

/*     @Get()
    getAllTasks(
        @CurrentUser() user: User
    ) {
        return this.taskService.findAllTasks(user);
    } */

    @Get(':id')
    getTask(
        @Param('id') id: number,
        @CurrentUser() user: User
    ) {
        return this.taskService.findOneTask(id, user)
    }

    @UsePipes(ValidationPipe)
    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @CurrentUser() user: User
    ) {
        return this.taskService.create(createTaskDto, user);
    }

    @UsePipes(ValidationPipe)
    @Put(':id')
    updateTask(
        @Param('id') id: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @CurrentUser() user: User
    ) {
        return this.taskService.updateTask(id, updateTaskDto, user);
    }

    @Delete(':id')
    deleteTask(
        @Param('id') id: number,
        @CurrentUser() user: User
    ) {
        return this.taskService.deleteTask(id, user);
    }

    @Delete()
    deleteMultiTasks(
        @Body('ids') ids: number[], 
        @CurrentUser() user: User
    ) {
        return this.taskService.deleteMultiTasks(ids, user);
    }

}
