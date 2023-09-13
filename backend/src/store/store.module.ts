import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { StoreController } from './store.controller';
import { usersProvider } from 'src/auth/user.provider';
import { StoreService } from './store.service';
@Module({
    imports: [
      DatabaseModule,
    ],
    controllers: [StoreController],
    providers: [
      ...usersProvider,
      StoreService
    ],
  })
  export class StoreModule {}