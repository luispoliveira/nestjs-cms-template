import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class RecoverDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
