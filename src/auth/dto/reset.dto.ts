import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class ResetDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    resetToken: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
