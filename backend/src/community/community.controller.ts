import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCommunity(@Request() req) {
    return this.communityService.get(req.user.id);
  }
}