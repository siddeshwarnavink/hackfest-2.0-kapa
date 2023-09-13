import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UpdatesController } from './updates.controller';
import { usersProvider } from 'src/auth/user.provider';
import { reviewsProvider } from './updates.provider';
import { UpdatesService } from './updates.service';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [UpdatesController],
    providers: [
        ...usersProvider,
        ...reviewsProvider,
        UpdatesService
    ],
    exports: [
        UpdatesService
    ]
})
export class UpdatesModule { }