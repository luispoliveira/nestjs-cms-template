import {MigrationInterface, QueryRunner} from "typeorm";
import {Role} from "../../../roles/entities/role.entity";
import {RoleEnum} from "../../../common/enums/role.enum";

export class addDefaultRoles1625584553687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminRole = Role.create({
            name: RoleEnum.Admin
        });

        await adminRole.save();

        const userRole = Role.create({
            name: RoleEnum.User
        });

        await userRole.save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
