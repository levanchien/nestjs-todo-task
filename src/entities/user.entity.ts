import { Exclude } from 'class-transformer';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
const bcrypt = require('bcrypt');

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

    @Exclude()
    @Column({  type: DataType.STRING })
    password: string;

    @Column({ type: DataType.STRING })
    firstName: string;

    @Column({ type: DataType.STRING })
    lastName: string;

    @Column({ type: DataType.DATE })
    dateCreated: any;
    
    @Column({ type: DataType.STRING })
    apiToken: string;

    @Column({ type: DataType.INTEGER })
    role: number;

    static hashPassword(rawPassword) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(rawPassword, salt);
    }

    comparePassword(rawPassword: string) {
        return bcrypt.compareSync(rawPassword, this.password);
    }
}