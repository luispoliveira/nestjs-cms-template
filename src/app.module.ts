import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolesModule} from './roles/roles.module';
import {PermissionsModule} from './permissions/permissions.module';
import {AuthModule} from './auth/auth.module';
import config from "../ormconfig";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./common/guards/jwt-auth.guard";
import {PermissionsGuard} from "./common/guards/permissions.guard";
import {RolesGuard} from "./common/guards/roles.guard";
import {CommandModule} from "nestjs-command";
import {ConfigModule} from "@nestjs/config";
import {configuration} from "./config/configuration";
import {validationSchema} from "./config/validation";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema
        }),
        TypeOrmModule.forRoot(config),
        AuthModule,
        PermissionsModule,
        RolesModule,
        UsersModule,
        CommandModule
    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
})
export class AppModule {
}
