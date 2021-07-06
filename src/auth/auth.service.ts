import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {PasswordUtil} from "../utils/password.util";
import {User} from "../users/entities/user.entity";
import {JwtPayload} from "../common/interfaces/jwt-payload.interface";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {MoreThan} from "typeorm";
import {RecoverDto} from "./dto/recover.dto";
import {ResetDto} from "./dto/reset.dto";
import {RoleEnum} from "../common/enums/role.enum";
import {Role} from "../roles/entities/role.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOneByUsername(username);

        if (user) {
            if (await PasswordUtil.comparePassword(user.password, password)) {
                const {password, ...result} = user;
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload: JwtPayload = {
            userId: user.id,
            username: user.username
        };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async signUp(createUserDto: CreateUserDto) {
        const roleUser = await Role.findOne({
            name: RoleEnum.User
        });

        const user = User.create({
            ...createUserDto,
            roles: [roleUser]
        });

        return await user.save();
    }

    async recoverPassword(recoverDto: RecoverDto) {
        const user = await User.findOne({email: recoverDto.email});
        if (!user) throw new NotFoundException('Email not found');

        await user.generatePasswordReset();
        await user.save();

        // const link = `${authConstants.authResetURL}${user.resetPasswordToken}`;
        //
        // const text = `Hi ${user.username} \n
        //             Please click on the following link ${link} to reset your password. \n\n
        //             If you did not request this, please ignore this email and your password will remain unchanged.\n`;
        //
        // this.sgMailerService.setMessage(
        //     user.email,
        //     'Password change request',
        //     text,
        // );
        //
        // await this.sgMailerService.sendEmail();
    }

    async resetPassword(resetDto: ResetDto) {
        const user = await User.findOne({
            where: {
                resetPasswordToken: resetDto.resetToken,
                resetPasswordExpires: MoreThan(new Date()),
            },
        });
        if (!user) {
            throw new BadRequestException(
                'Password reset token is invalid or has expired.',
            );
        }

        user.password = resetDto.password;
        user.resetPasswordExpires = null;
        user.resetPasswordToken = null;

        await user.save();
    }
}
