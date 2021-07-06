import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UsersService} from "../../users/users.service";
import {PermissionEnum} from "../enums/permission.enum";
import {PERMISSIONS_KEY} from "../decorators/permissions.decorator";
import {User} from "../../users/entities/user.entity";

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private usersService: UsersService) {
    }

    async canActivate(context: ExecutionContext) {
        const requiredPermissions = this.reflector.getAllAndOverride<PermissionEnum[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (!requiredPermissions) return true;

        const {user}: { user: User } = context.switchToHttp().getRequest();

        const stringPermissions: string[] = [];

        const permissions = await this.usersService.getUserPermissions(user.id);

        permissions.map((permission) => stringPermissions.push(permission.name));

        return requiredPermissions.some((permission) =>
            stringPermissions?.includes(permission)
        );
    }
}
