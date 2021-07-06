import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {Role} from "../roles/entities/role.entity";
import {Permission} from "../permissions/entities/permission.entity";
import {AddRemoveRoleDto} from "./dto/add-remove-role.dto";
import {AddRemovePermissionDto} from "./dto/add-remove-permission.dto";

@Injectable()
export class UsersService {

    async findOneByUsername(username: string): Promise<User> {
        return await User.findOne({
            where: {username: username}
        })
    }

    async getUserRoles(userId: number): Promise<Role[]> {
        const user = await User.findOne(userId, {
            relations: ['roles']
        });

        if (user) return user.roles;

        return [];
    }

    async getUserPermissions(userId: number): Promise<Permission[]> {
        const permissions: Permission[] = [];

        const user = await User.findOne(userId, {
            relations: ['roles', 'permissions', 'roles.permissions']
        });

        if (!user) return [];

        user.permissions.map((permission) =>
            permissions.push(permission)
        );

        const roles = user.roles;

        roles.map((role) =>
            role.permissions.map((permission) =>
                !permissions.includes(permission) ? permissions.push(permission) : null
            )
        )

        return permissions;
    }

    async create(createUserDto: CreateUserDto, user: User) {
        const userEntity = User.create({
            ...createUserDto,
            createdBy: user.username,
            updatedBy: user.username
        });

        try {
            return await userEntity.save();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async findAll() {
        return await User.find();
    }

    async findOne(id: number) {
        const user = await User.findOne(id);

        if (!user) throw new NotFoundException();

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto, user: User) {

        const userEntity = await User.findOne(id);

        if (!userEntity) throw new NotFoundException();

        userEntity.email = updateUserDto.email;
        userEntity.updatedBy = user.username;

        try {
            return await userEntity.save();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async remove(id: number) {
        const user = await User.findOne(id);

        if (!user) throw new NotFoundException();

        try {
            return await User.delete(id);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async addRole(addRoleDto: AddRemoveRoleDto) {
        const user = await User.findOne(addRoleDto.userId, {
            relations: ['roles']
        });

        if (!user) throw new NotFoundException('User not found');

        const role = await Role.findOne(addRoleDto.roleId);

        if (!role) throw new NotFoundException('Role not found');

        user.roles = [...user.roles, role];

        return await user.save();
    }

    async removeRole(removeRoleDto: AddRemoveRoleDto) {
        const user = await User.findOne(removeRoleDto.userId, {
            relations: ['roles']
        });

        if (!user) throw new NotFoundException('User not found');

        user.roles = user.roles.filter(
            (role) => role.id !== removeRoleDto.roleId
        );

        return await user.save();
    }

    async addPermission(addPermissionDto: AddRemovePermissionDto) {
        const user = await User.findOne(addPermissionDto.userId, {
            relations: ['roles']
        });

        if (!user) throw new NotFoundException('User not found');

        const permission = await Permission.findOne(addPermissionDto.permissionId);

        if (!permission) throw new NotFoundException('Permission not found');

        user.permissions = [...user.permissions, permission];

        return await user.save();
    }

    async removePermission(removePermissionDto: AddRemovePermissionDto) {
        const user = await User.findOne(removePermissionDto.userId, {
            relations: ['roles']
        });

        if (!user) throw new NotFoundException('User not found');

        user.permissions = user.permissions.filter(
            (permission) => permission.id !== removePermissionDto.permissionId,
        );

        return await user.save();
    }
}
