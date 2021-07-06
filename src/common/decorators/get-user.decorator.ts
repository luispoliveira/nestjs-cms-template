import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {User} from "../../users/entities/user.entity";

export const GetUser = createParamDecorator(
    (data, context: ExecutionContext): User => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
)
