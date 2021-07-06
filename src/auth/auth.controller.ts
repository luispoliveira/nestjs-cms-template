import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {Public} from "../common/decorators/is-public.decorator";
import {LocalAuthGuard} from "../common/guards/local-auth.guard";
import {User} from "../users/entities/user.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {RecoverDto} from "./dto/recover.dto";
import {ResetDto} from "./dto/reset.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOkResponse({
        schema: {
            example: {access_token: 'asdfj9okjni12uhf9jocpmk'}
        }
    })
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Request() request) {
        return this.authService.login(request.user);
    }

    @ApiOkResponse({type: User})
    @Public()
    @Post('sign-up')
    async singUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @ApiOkResponse({
        schema: {
            example: {message: 'A reset email has been sent to your email.'},
        },
    })
    @ApiNotFoundResponse()
    @Public()
    @Post('recover-password')
    async recoverPassword(@Body() recoverDto: RecoverDto) {
        await this.authService.recoverPassword(recoverDto);
        return {message: 'A reset email has been sent to your email.'};
    }

    @ApiOkResponse({
        schema: {
            example: {message: 'Your password has been updated.'},
        },
    })
    @ApiBadRequestResponse()
    @Public()
    @Post('reset-password')
    async resetPassword(@Body() resetDto: ResetDto) {
        await this.authService.resetPassword(resetDto);
        return {
            message: 'Your password has been updated.',
        };
    }
}
