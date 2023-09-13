import { Controller, Param, Post, UseGuards, Request, HttpException, HttpStatus, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserProfile(@Param('id') userId: string, @Request() req) {
    try {
      return await this.userService.getUserProfile(req.user.id, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  async followUser(@Param('id') userId: string, @Request() req) {
    try {
      await this.userService.followUser(req.user.id, userId);
      return {
        message: 'User followed'
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unfollow')
  async unfollowUser(@Param('id') userId: string, @Request() req) {
    try {
      await this.userService.unfollowUser(req.user.id, userId);
      return {
        message: 'User unfollowed'
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}