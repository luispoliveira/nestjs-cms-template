import {Injectable} from "@nestjs/common";
import {UsersService} from "./users.service";
import {Command, Positional} from "nestjs-command";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersCommand {
    constructor(private readonly usersService: UsersService) {
    }

    @Command({
        command: 'user:activate-user <userId>',
        describe: 'Activates an user',
        autoExit: true,
    })
    async activateUser(
        @Positional({
            name: 'userId',
            describe: 'the user Id',
            type: 'number',
        })
            userId: number,
    ) {
        await this.usersService.update(
            userId,
            {isActive: true} as UpdateUserDto,
            {username: 'admin'} as User,
        );
    }

    @Command({
        command: 'user:deactivate-user <userId>',
        describe: 'Deactivate an user',
        autoExit: true,
    })
    async deactivateUser(
        @Positional({
            name: 'userId',
            describe: 'the user Id',
            type: 'number',
        })
            userId: number,
    ) {
        await this.usersService.update(
            userId,
            {isActive: false} as UpdateUserDto,
            {username: 'admin'} as User,
        );
    }
}
