import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { userCommunityProvider } from './userCommunity.provider';
import { communityProvider } from './community.provider';
import { CommunityService } from './community.service';
import { usersProvider } from 'src/auth/user.provider';
@Module({
    imports: [
      DatabaseModule,
    ],
    controllers: [],
    providers: [
      ...usersProvider,
      ...userCommunityProvider,
      ...communityProvider,
      CommunityService
    ],
  })
  export class CommunityModule {}