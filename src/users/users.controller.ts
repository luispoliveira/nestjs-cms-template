import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {GetUser} from "../common/decorators/get-user.decorator";
import {AddRemoveRoleDto} from "./dto/add-remove-role.dto";
import {AddRemovePermissionDto} from "./dto/add-remove-permission.dto";

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiCreatedResponse({type: User})
    @ApiBadRequestResponse()
    @Post()
    create(@Body() createUserDto: CreateUserDto, @GetUser() user: User) {
        return this.usersService.create(createUserDto, user);
    }

    @ApiOkResponse({type: User, isArray: true})
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @ApiOkResponse({type: User, isArray: false})
    @ApiNotFoundResponse()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @ApiOkResponse({type: User, isArray: false})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
        return this.usersService.update(id, updateUserDto, user);
    }

    @ApiOkResponse({type: User, isArray: false})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }


    @ApiOkResponse({type: User, isArray: false})
    @ApiNotFoundResponse()
    @Post('add-role')
    async addRole(@Body() addRoleDto: AddRemoveRoleDto) {
        return await this.usersService.addRole(addRoleDto);
    }

    @ApiOkResponse({type: User, isArray: false})
    @ApiNotFoundResponse()
    @Post('remove-role')
    async removeRole(@Body() removeRoleDto: AddRemoveRoleDto) {
        return await this.usersService.removeRole(removeRoleDto);
    }

    @ApiOkResponse({type: User, isArray: false})
    @ApiNotFoundResponse()
    @Post('add-permission')
    async addPermission(@Body() addPermissionDto: AddRemovePermissionDto) {
        return await this.usersService.addPermission(addPermissionDto);
    }

    @ApiOkResponse({type: User, isArray: false})
    @ApiNotFoundResponse()
    @Post('remove-permission')
    async removePermission(@Body() removePermissionDto: AddRemovePermissionDto) {
        return await this.usersService.removePermission(removePermissionDto);
    }
}
