import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UsersService} from "../../users/users.service";
import {RoleEnum} from "../enums/role.enum";
import {ROLES_KEY} from "../decorators/roles.decorator";
import {User} from "../../users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService
    ) {
    }


    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()
            ]
        );

        if (!requiredRoles) return true;

        const {user}: { user: User } = context.switchToHttp().getRequest();

        const stringRoles: string[] = [];

        const roles = await this.usersService.getUserRoles(user.id);

        roles.map((role) => stringRoles.push(role.name));

        return requiredRoles.some((role: RoleEnum) => stringRoles?.includes(role));
    }
}
