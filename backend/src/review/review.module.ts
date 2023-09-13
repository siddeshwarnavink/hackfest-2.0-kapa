import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ReviewController } from './review.controller';
import { usersProvider } from 'src/auth/user.provider';
import { reviewsProvider } from './review.provider';
import { ReviewService } from './review.service';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [ReviewController],
    providers: [
        ...usersProvider,
        ...reviewsProvider,
        ReviewService
    ],
    exports: [
        ReviewService
    ]
})
export class ReviewModule { }