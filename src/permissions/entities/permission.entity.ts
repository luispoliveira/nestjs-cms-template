import {CustomBaseEntity} from "../../common/entities/custom-base-entity.entity";
import {User} from "../../users/entities/user.entity";
import {Role} from "../../roles/entities/role.entity";
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
@Unique(['name'])
export class Permission extends CustomBaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ManyToMany(() => User, (user) => user.permissions)
    users: User[];

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}
