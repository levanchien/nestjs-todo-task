import { Controller, Get, Param, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor, SetMetadata } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { SerialzierKeys, SERIALZIER_KEYS } from 'src/common/decorators/serialzier-keys.decorator';
import { SerialzierInterceptor } from 'src/common/interceptors/serializer.interceptor';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/interfaces/role';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @SerialzierKeys('password')
    @UseInterceptors(SerialzierInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param('id') id: number) {
        return this.usersService.findOneById(id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('')
    getAll(@Request() rq) {
        return this.usersService.findAll();
    }   
}
