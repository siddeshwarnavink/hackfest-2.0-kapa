import { Controller, Post, Get, UseGuards, Request, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PointsService } from './points.service';


@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/recharge')
  async recharge(@Request() req) {
    return this.pointsService.recharge(req.user, req.body.amount);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/verifyTransaction')
  // async verify(@Body('txHash') txHash: string) {
  //   return this.pointsService.verifyTransaction(txHash);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('/withdraw')
  async withdraw(@Request() req) {
    return this.pointsService.withdraw(req.user, req.body.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/transfer')
  async transfer(@Request() req) {
    return this.pointsService.transfer(
      req.user,
      req.body.to,
      req.body.amount,
      req.body.payload,
      req.body.transferType
    );
  }
}
