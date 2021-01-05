import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'Users'
})
export class UserEntity extends Model<UserEntity> {
    
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER,
        primaryKey: true
    })
    id: number;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({  type: DataType.STRING })
    password: string;

    @Column({ type: DataType.STRING })
    firstName: string;

    @Column({ type: DataType.STRING })
    lastName: string;

    @Column({ type: DataType.DATE })
    dateCreated: string;
}