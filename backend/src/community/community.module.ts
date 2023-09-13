import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { userCommunityProvider } from './userCommunity.provider';
import { communityProvider } from './community.provider';
import { CommunityService } from './community.service';
import { usersProvider } from 'src/auth/user.provider';
import { CommunityController } from './community.controller';
@Module({
    imports: [
      DatabaseModule,
    ],
    controllers: [CommunityController],
    providers: [
      ...usersProvider,
      ...userCommunityProvider,
      ...communityProvider,
      CommunityService
    ],
  })
  export class CommunityModule {}