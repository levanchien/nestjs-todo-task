import { HttpStatus, Injectable } from '@nestjs/common'; import { JwtService } from '@nestjs/jwt';
import { ApiException } from 'src/common/exceptions/api-exception.exception';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { UsersService } from 'src/core/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
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

    async generateJwt(user) {
        const payload = { username: user.email, sub: user.id };
        
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

        return newUser;
    }
}