import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';

import { StoreService } from './store.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('store')
export class StoreController {
    constructor(
        private readonly storeService: StoreService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getHomeFeed(@Request() req) {
        return this.storeService.getHomeFeed();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getVideoDetail(@Param('id') videoId: string, @Request() req) {
      return this.storeService.getProductDetail(videoId, req.user.id);
    }
}