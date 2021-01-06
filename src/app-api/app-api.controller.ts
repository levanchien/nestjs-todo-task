import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTokenAuthGuard } from 'src/auth/api-token-auth.guard';

@Controller('api')
export class AppApiController {

    @UseGuards(ApiTokenAuthGuard)
    @Get()
    profile(@Request() rq) {
        return rq.user;
    }
}
