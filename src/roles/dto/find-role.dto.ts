import {ApiProperty, PartialType} from "@nestjs/swagger";
import {PaginationDto} from "../../common/dtos/pagination.dto";
import {IsOptional, IsString} from "class-validator";

export class FindRoleDto extends PartialType(PaginationDto) {
    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    name: string;
}
