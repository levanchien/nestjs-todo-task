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

    @Column({  type: DataType.STRING })
    password: string;

    @Column({ type: DataType.STRING })
    firstName: string;

    @Column({ type: DataType.STRING })
    lastName: string;

    @Column({ type: DataType.DATE })
    dateCreated: string;

    hashPassword(rawPassword) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(rawPassword, salt);
    }

    comparePassword(rawPassword, hash) {
        return bcrypt.compareSync(rawPassword, hash);
    }
}