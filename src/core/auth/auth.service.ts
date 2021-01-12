import { HttpStatus, Injectable } from '@nestjs/common';import { EventEmitter2 } from '@nestjs/event-emitter';
 import { JwtService } from '@nestjs/jwt';
import { ApiException } from 'src/common/exceptions/api-exception.exception';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { UsersService } from 'src/core/users/users.service';
import { User } from '../users/interfaces/user.interface';
import { AUTH_EVENTS } from './auth.event';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2
    ) { }

    async validate(email: string, password: string) {
        const findUser = await this.usersService.findOneByEmail(email);
        if (!findUser) {
            throw new ApiException({ property: 'email', value: email, messages: ['Email is not exists'] }, HttpStatus.UNAUTHORIZED);
        }
        if (!findUser.comparePassword(password)) {
            throw new ApiException({ property: 'password', value: password, messages: ['Wrong password'] }, HttpStatus.UNAUTHORIZED);
        }

        const plainUser: any = findUser.get({ plain: true });

        delete plainUser.password;

        return plainUser;
    }

    async validateToken(token: string) {
        const findUser = await this.usersService.findByToken(token);
        if (!findUser) {
            throw new ApiException({ property: 'token', value: token, messages: ['Token is invalid'] }, HttpStatus.UNAUTHORIZED);
        }
        return findUser;
    }

    async generateJwt(user: User) {
        const payload = { username: user.email, sub: user.id , role: user.role};
        
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(createUserDto: CreateUserDto) {
        const findUser = await this.usersService.findOneByEmail(createUserDto.email);
        if (findUser) {
            throw new ApiException({ property: 'email', value: createUserDto.email, messages: ['Email is already exists'] }, HttpStatus.BAD_REQUEST);
        }
        const newUser = await this.usersService.create(createUserDto);

        this.eventEmitter.emit(AUTH_EVENTS.ON_USER_REGISTERED, newUser);

        return newUser;
    }
}
