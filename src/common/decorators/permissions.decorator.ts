import {PermissionEnum} from "../enums/permission.enum";
import {SetMetadata} from "@nestjs/common";

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: PermissionEnum[]) => SetMetadata(PERMISSIONS_KEY, permissions)
