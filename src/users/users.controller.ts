import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    get(@Param('id') id: number) {
        return this.usersService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll(@Request() rq) {
        return this.usersService.findAll();
    }
}
