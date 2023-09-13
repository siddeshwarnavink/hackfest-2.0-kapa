import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userFollowerProvider } from './userFollower.provider';
import { usersProvider } from 'src/auth/user.provider';
import { videossProvider } from 'src/videos/videos.provider';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        ...userFollowerProvider,
        ...usersProvider,
        ...videossProvider,
    ],
})
export class UsersModule { }