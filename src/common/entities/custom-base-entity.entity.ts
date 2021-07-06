import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

export class CustomBaseEntity extends BaseEntity {
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @Column({nullable: true})
    createdBy?: string;

    @ApiProperty()
    @Column({nullable: true})
    updatedBy?: string;
}
