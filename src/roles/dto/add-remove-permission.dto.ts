import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class AddRemovePermissionDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    permissionId: number;
}
