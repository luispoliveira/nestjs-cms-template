import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {User} from "../users/entities/user.entity";
import {Role} from "./entities/role.entity";
import {FindRoleDto} from "./dto/find-role.dto";
import {AddRemovePermissionDto} from "./dto/add-remove-permission.dto";
import {Permission} from "../permissions/entities/permission.entity";

@Injectable()
export class RolesService {
    async create(createRoleDto: CreateRoleDto, user: User) {
        const role = Role.create({
            ...createRoleDto,
            createdBy: user.username,
            updatedBy: user.username
        });

        try {
            return await role.save();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async findAll(findRoleDto: FindRoleDto): Promise<{ data: Role[], total: number, page: number }> {
        const {page, limit, ...conditions} = findRoleDto;

        const skip = (page - 1) * limit;

        const [data, total] = await Role.findAndCount({
            where: {...conditions},
            take: limit,
            skip: skip
        })

        return {data, total, page};
    }

    async findOne(id: number) {
        const role = await Role.findOne(id);

        if (!role) throw new NotFoundException();

        return role;
    }

    async update(id: number, updateRoleDto: UpdateRoleDto, user: User) {
        const role = await Role.findOne(id);

        if (!role) throw new NotFoundException();

        role.name = updateRoleDto.name;
        role.updatedBy = user.username;

        try {
            return await role.save();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async remove(id: number) {
        const role = await Role.findOne(id);

        if (!role) throw new NotFoundException();

        try {
            return await Role.delete(id);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async addPermission(addPermissionDto: AddRemovePermissionDto) {
        const role = await Role.findOne(addPermissionDto.roleId, {
            relations: ['permissions']
        });

        if (!role) throw new BadRequestException('Role not found');

        const permission = await Permission.findOne(addPermissionDto.permissionId);

        if (!permission) throw new BadRequestException('Permission not found');

        role.permissions = [...role.permissions, permission];

        return await role.save();
    }

    async removePermission(removePermissionDto: AddRemovePermissionDto) {
        const role = await Role.findOne(removePermissionDto.roleId, {
            relations: ['permissions']
        });

        if (!role) throw new BadRequestException('Role not found');

        role.permissions = role.permissions.filter(
            (permission) => permission.id !== removePermissionDto.permissionId
        );

        return await role.save();
    }
}
