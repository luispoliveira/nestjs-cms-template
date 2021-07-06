import {Injectable, NotFoundException} from '@nestjs/common';
import {Permission} from "./entities/permission.entity";
import {FindPermissionDto} from "./dto/find-permission.dto";

@Injectable()
export class PermissionsService {
    async findAll(findPermissionDto: FindPermissionDto): Promise<{ data: Permission[], total: number, page: number }> {
        const {page, limit, ...conditions} = findPermissionDto;

        const skip = (page - 1) * limit;

        const [data, total] = await Permission.findAndCount({
            where: {...conditions},
            take: limit,
            skip: skip
        });

        return {data, total, page};
    }

    async findOne(id: number): Promise<Permission> {
        const permission = await Permission.findOne(id);

        if (!permission) throw new NotFoundException();

        return permission;
    }

}
