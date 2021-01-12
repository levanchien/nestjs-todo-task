import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AppLoggerService } from "../my-logger/my-logger.service";
import { User } from "../users/interfaces/user.interface";

export enum AUTH_EVENTS {
    ON_USER_REGISTERED = 'onUserRegistered'
}

@Injectable()
export class AuthEvent {

    private readonly logger = AppLoggerService.getInstance();

    constructor() {

    }

    @OnEvent(AUTH_EVENTS.ON_USER_REGISTERED)
    onUserRegistered(newUser: User) {
        this.logger.event('User registred: ' + JSON.stringify(newUser));
    }
}