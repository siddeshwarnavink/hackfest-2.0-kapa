import { Controller, Post, Get, UseGuards, Request, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  
  @HttpCode(HttpStatus.CREATED)
  @Post('/createAccount')
  async createAccount(@Request() req) {
    return this.authService.createAccount(req.body);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/refreshToken')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
