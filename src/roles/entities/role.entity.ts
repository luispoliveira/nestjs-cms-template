import {CustomBaseEntity} from "../../common/entities/custom-base-entity.entity";
import {Permission} from "../../permissions/entities/permission.entity";
import {User} from "../../users/entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
@Unique(['name'])
export class Role extends CustomBaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

    @ApiProperty({type: Permission, isArray: true})
    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable()
    permissions: Permission[]
}
