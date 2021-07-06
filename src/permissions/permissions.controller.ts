import {Controller, Get, Param, ParseIntPipe, Query} from '@nestjs/common';
import {PermissionsService} from './permissions.service';
import {ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {Permission} from "./entities/permission.entity";
import {FindPermissionDto} from "./dto/find-permission.dto";

@ApiTags('Permissions')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {
    }

    @ApiOkResponse({type: Permission, isArray: true})
    @Get()
    findAll(@Query() findPermissionDto: FindPermissionDto) {
        return this.permissionsService.findAll(findPermissionDto);
    }

    @ApiOkResponse({type: Permission, isArray: false})
    @ApiNotFoundResponse()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.permissionsService.findOne(id);
    }

}
