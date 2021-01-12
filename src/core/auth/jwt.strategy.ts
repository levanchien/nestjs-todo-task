import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT } from "src/constants/constants";

export class JwtStategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT.secret
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.username, role: payload.role };
    }
}