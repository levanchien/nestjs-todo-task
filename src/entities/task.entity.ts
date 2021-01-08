import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'Tasks'
})
export class TaskEntity extends Model<TaskEntity> {
    
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER,
        primaryKey: true
    })
    id: number;

    @Column({ type: DataType.INTEGER })
    userId: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({  type: DataType.STRING })
    description: string;

    @Column({ type: DataType.BOOLEAN })
    isDone: boolean;

    @Column({ type: DataType.STRING })
    isDeleted: string;

    @Column({ type: DataType.INTEGER })
    status: number;

    @Column({  type: DataType.DATE })
    dateCreated: string;    

    @Column({  type: DataType.DATE })
    dateExpired: string;    
}