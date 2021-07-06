import {CustomBaseEntity} from "../../common/entities/custom-base-entity.entity";
import {Role} from "../../roles/entities/role.entity";
import {Permission} from "../../permissions/entities/permission.entity";
import {
    AfterLoad,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {PasswordUtil} from "../../utils/password.util";
import {randomBytes} from "crypto";

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends CustomBaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column()
    email: string;

    @Column()
    password: string;

    @ApiProperty()
    @Column({default: false})
    isActive: boolean;

    @Column({nullable: true})
    resetPasswordToken: string;

    @Column({nullable: true})
    resetPasswordExpires: Date;

    @ApiProperty({type: Role, isArray: true})
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];

    @ApiProperty({type: Permission, isArray: true})
    @ManyToMany(() => Permission, (permission) => permission.users)
    @JoinTable()
    permissions: Permission[];

    private tempPassword: string;

    @AfterLoad()
    afterLoad = () => {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    beforeInsert = async () => {
        await this.hashPassword()
    }

    @BeforeUpdate()
    beforeUpdate = async () => {
        if (this.tempPassword !== this.password) {
            await this.hashPassword()
        }
    }

    /**
     * METHODS
     */

    hashPassword = async () => {
        this.password = await PasswordUtil.hashPassword(this.password);
    }

    generatePasswordReset = async () => {
        const expirationDate = Date.now() + 3600000;

        this.resetPasswordToken = randomBytes(20).toString('hex');
        this.resetPasswordExpires = new Date(expirationDate);
    }
}
