import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PointsModule } from './points/points.module';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { StoreModule } from './store/store.module';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [
    AuthModule,
    PointsModule,
    VideosModule,
    UsersModule,
    ReviewModule,
    StoreModule,
    CommunityModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
