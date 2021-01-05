import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';


@Injectable()
export class UsersService {
    
    constructor(private usersRepository: UserEntity) {

    }
}
