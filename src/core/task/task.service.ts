import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Transaction } from 'sequelize';
import { PageQuery } from 'src/common/interfaces/page-object.interface';
import { TaskEntity } from 'src/entities/task.entity';
import { ApiException } from 'src/common/exceptions/api-exception.exception';
import { User } from 'src/core/users/interfaces/user.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './interfaces/task.interface';
import { Cron } from '@nestjs/schedule';
import { AppLoggerService } from '../my-logger/my-logger.service';

@Injectable()
export class TaskService {

    private readonly logger = AppLoggerService.getInstance();

    constructor(
        @InjectModel(TaskEntity)
        private TaskRepository: typeof TaskEntity,
        private sequelize: Sequelize
    ) {

    }

    search(pageQuery: PageQuery, user: User) {
        const where = {};
        where['userId'] = user.id;
        return this.TaskRepository.findAndCountAll({
            where: where,
            offset: pageQuery.offset,
            limit: pageQuery.limit,
            order: pageQuery.order
        });
    }

    findAllTasks(user: User) {
        return this.TaskRepository.findAll({
            where: {
                userId: user.id
            }
        });
    }

    create(createTaskDto: CreateTaskDto, user: User) {
        return this.TaskRepository.create({
            ...createTaskDto,
            isDone: false,
            isDeleted: false,
            status: TaskStatus.OPEN,
            userId: user.id,
            dateCreated: new Date()
        });
    }

    async findOneTask(id: number, user: User) {
        const task = await this.TaskRepository.findOne({
            where: {
                id: id,
                userId: user.id
            }
        });

        if (!task) {
            throw new NotFoundException(`Task with id "${id}" not found `);
        }

        return task;
    }

    async findMultiTasks(ids: number[], user: User, transaction: Transaction) {
        const tasks = await this.TaskRepository.findAll({
            where: {
                id: ids,
                userId: user.id
            },
            transaction: transaction
        });

        if (tasks.length !== ids.length) {
            throw new ApiException({
                property: "ids",
                value: ids.toString(),
                messages: [
                    "One or more taks were not found"
                ]
            }, HttpStatus.NOT_FOUND)
        }

        return tasks;
    }

    async deleteTask(id: number, user: User) {
        const task = await this.findOneTask(id, user);
        return task.destroy();
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User) {
        const task = await this.findOneTask(id, user);
        return task.update({
            ...updateTaskDto
        });
    }

    async deleteMultiTasks(ids: number[], user: User) {
        return this.sequelize.transaction().then(async (transaction) => {
            try {
                await this.lockTask (ids, transaction);
                await this.findMultiTasks(ids, user, transaction);
                const deleteResult = await this.TaskRepository.destroy({
                    where: {
                        id: ids
                    },
                    transaction: transaction
                });
                await transaction.commit();
                return deleteResult;
            } catch (e) {
                await transaction.rollback();
                throw e;
            }
        });
    }

    lockTask(ids: number | number[], transaction: Transaction) {
        return this.sequelize.query(`Select * FROM Tasks with (UPDLOCK , ROWLOCK) Where id in (${ids.toString()})`, {
            transaction: transaction,
            raw: true,
            mapToModel: true
        });
    }

    @Cron('* 10 * * * *')
    async taskStatusCounter() {
        const tasksOpen = await this.countTasksByStatus(TaskStatus.OPEN);
        this.logger.schedule('TOTAL TASKS OPEN: ' + tasksOpen);
    }

    countTasksByStatus(status: TaskStatus) {
        return this.TaskRepository.count({
            col: 'status',
            where: {
                status: status
            }
        })
    }

}
