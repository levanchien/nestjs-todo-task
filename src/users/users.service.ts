import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    
    constructor(
        @InjectModel(UserEntity)
        private usersRepository: typeof UserEntity) {

    }

    create(createUserDto: CreateUserDto) {
        createUserDto.password = UserEntity.hashPassword(createUserDto.password);
        createUserDto['dateCreated'] = new Date();
        return this.usersRepository.create(createUserDto);
    }

    findOneById(id: number) {
        return this.usersRepository.findOne({
            where: {
                id: id
            }
        });
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOne({
            where: {
                email: email
            }
        });
    }

    findAll() {
        return this.usersRepository.findAll({
            attributes: ['id', 'email', 'firstName', 'lastName', 'dateCreated']
        });
    }
}
