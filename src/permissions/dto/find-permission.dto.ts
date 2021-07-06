import {ApiProperty, PartialType} from "@nestjs/swagger";
import {PaginationDto} from "../../common/dtos/pagination.dto";
import {IsOptional, IsString} from "class-validator";

export class FindPermissionDto extends PartialType(PaginationDto) {
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    name: string;
}
