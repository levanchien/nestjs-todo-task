import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { CreateUserDto } from 'src/core/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard, LocalAuthGuardForJWT } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() request) {
        return request.user;
    }

    @UseGuards(LocalAuthGuardForJWT)
    @Post('jwt-login')
    jwtLogin(@Request() request) {
        return this.authService.generateJwt(request.user);
    }
}
