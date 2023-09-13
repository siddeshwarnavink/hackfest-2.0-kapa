import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { StoreController } from './store.controller';
import { usersProvider } from 'src/auth/user.provider';
import { StoreService } from './store.service';
import { storesProvider } from './store.provider';
import { userFollowerProvider } from 'src/user/userFollower.provider';
import { ReviewModule } from 'src/review/review.module';
@Module({
    imports: [
      DatabaseModule,
      ReviewModule
    ],
    controllers: [StoreController],
    providers: [
      ...usersProvider,
      ...storesProvider,
      ...userFollowerProvider,
      StoreService
    ],
  })
  export class StoreModule {}