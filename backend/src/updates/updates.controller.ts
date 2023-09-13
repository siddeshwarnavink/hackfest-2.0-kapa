import { Controller, Post, Get, UseGuards, Request, Param } from '@nestjs/common';

import { UpdatesService } from './updates.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('review')
export class UpdatesController {
    constructor(private readonly updatesService: UpdatesService) { }
}
