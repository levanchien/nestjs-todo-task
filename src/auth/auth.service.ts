import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiException } from 'src/exception/api-exception.exception';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async validate(email: string, password: string) {
        const findUser = await this.usersService.findOneByEmail(email);
        if (!findUser) {
            throw new ApiException({ property: 'email', value: email, messages: ['Email is not exists'] }, HttpStatus.UNAUTHORIZED);
        }
        if (!findUser.comparePassword(password)) {
            throw new ApiException({ property: 'password', value: password, messages: ['Wrong password'] }, HttpStatus.UNAUTHORIZED);
        }
        return findUser;
    }

    async register(createUserDto: CreateUserDto) {
        const findUser = await this.usersService.findOneByEmail(createUserDto.email);
        if (findUser) {
            throw new ApiException({ property: 'email', value: createUserDto.email, messages: ['Email is already exists'] }, HttpStatus.BAD_REQUEST);
        }
        const newUser = await this.usersService.create(createUserDto);

        return newUser;
    }
}
