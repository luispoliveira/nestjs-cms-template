import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {UsersCommand} from "./users.command";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCommand],
  exports: [UsersService]
})
export class UsersModule {
}
