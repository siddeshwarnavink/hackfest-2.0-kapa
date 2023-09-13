import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { videossProvider } from './videos.provider';
import { videosPurchaseProvider } from './video-purchase.provider';
import { userFollowerProvider } from 'src/user/userFollower.provider';
import { ReviewModule } from 'src/review/review.module';

@Module({
    imports: [
        DatabaseModule,
        ReviewModule
    ],
    controllers: [VideosController],
    providers: [
        ...videossProvider,
        ...videosPurchaseProvider,
        ...userFollowerProvider,
        VideosService,
    ],
})
export class VideosModule { }