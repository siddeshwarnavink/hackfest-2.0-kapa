import { Controller, Post, Get, UseGuards, Request, Param } from '@nestjs/common';

import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':payload')
    async getReviews(@Param('payload') payload, @Request() req) {
        return this.reviewService.getReview(req.user.id, payload);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':payload')
    async postReviews(@Param('payload') payload, @Request() req) {
        return this.reviewService.postReview(req.user.id, payload, req.body);
    }
}
