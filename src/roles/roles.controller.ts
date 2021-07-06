import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {RolesService} from './roles.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {UpdateRoleDto} from './dto/update-role.dto';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Role} from "./entities/role.entity";
import {GetUser} from "../common/decorators/get-user.decorator";
import {User} from "../users/entities/user.entity";
import {FindRoleDto} from "./dto/find-role.dto";
import {AddRemovePermissionDto} from "./dto/add-remove-permission.dto";

@ApiTags('Roles')
@ApiUnauthorizedResponse()
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {
    }

    @ApiCreatedResponse({type: Role, isArray: false})
    @ApiBadRequestResponse()
    @Post()
    create(@Body() createRoleDto: CreateRoleDto, @GetUser() user: User) {
        return this.rolesService.create(createRoleDto, user);
    }

    @ApiOkResponse({type: Role, isArray: true})
    @Get()
    findAll(@Query() findRoleDto: FindRoleDto) {
        return this.rolesService.findAll(findRoleDto);
    }

    @ApiOkResponse({type: Role, isArray: false})
    @ApiNotFoundResponse()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.findOne(id);
    }

    @ApiOkResponse({type: Role, isArray: false})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto, @GetUser() user: User) {
        return this.rolesService.update(id, updateRoleDto, user);
    }

    @ApiOkResponse({type: Role, isArray: false})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.remove(id);
    }

    @ApiOkResponse({type: Role, isArray: false})
    @ApiNotFoundResponse()
    @Post('add-permission')
    async addPermission(@Body() addPermissionDto: AddRemovePermissionDto) {
        return await this.rolesService.addPermission(addPermissionDto);
    }

    @ApiOkResponse({type: Role, isArray: false})
    @ApiNotFoundResponse()
    @Post('remove-permission')
    async removePermission(@Body() removePermissionDto: AddRemovePermissionDto) {
        return await this.rolesService.removePermission(removePermissionDto);
    }
}
