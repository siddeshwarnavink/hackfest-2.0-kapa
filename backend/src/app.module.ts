import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PointsModule } from './points/points.module';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './user/user.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    AuthModule,
    PointsModule,
    VideosModule,
    UsersModule,
    ReviewModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
