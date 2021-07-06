import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from "./constants";
import {JwtPayload} from "../common/interfaces/jwt-payload.interface";
import {User} from "../users/entities/user.entity";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {userId} = payload;
        const user = await User.findOne(userId);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}
