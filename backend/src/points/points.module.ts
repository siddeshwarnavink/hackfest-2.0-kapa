import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { usersProvider } from 'src/auth/user.provider';
import { videosPurchaseProvider } from 'src/videos/video-purchase.provider';

@Module({
    imports: [
        DatabaseModule,
        BlockchainModule
    ],
    controllers: [PointsController],
    providers: [
        PointsService,
        ...usersProvider,
        ...videosPurchaseProvider,
    ],
})
export class PointsModule { }