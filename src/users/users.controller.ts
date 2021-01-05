import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(new AuthGuard())
    @Get(':id')
    get(@Param('id') id: number) {
        return this.usersService.findOneById(id);
    }
}
