import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsOptional} from "class-validator";

export class PaginationDto {
    @ApiProperty({required: false, default: 10})
    @IsOptional()
    @IsNumberString()
    limit = 10;

    @ApiProperty({required: false, default: 1})
    @IsOptional()
    @IsNumberString()
    page = 1;
}
