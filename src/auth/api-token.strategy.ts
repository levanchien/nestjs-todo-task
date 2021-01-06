import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { AuthService } from "./auth.service";

@Injectable()
export class ApiTokenStategy extends PassportStrategy(Strategy, 'api-token') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(token: string) {
        return await this.authService.validateToken(token);
    }
}