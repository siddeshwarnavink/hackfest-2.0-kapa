import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { usersProvider } from './user.provider';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { videossProvider } from 'src/videos/videos.provider';
import { userFollowerProvider } from 'src/user/userFollower.provider';
import { storesProvider } from 'src/store/store.provider';

@Module({
    imports: [
      DatabaseModule,
      PassportModule,
      JwtModule.register({
        global: true,
        secret: process.env.JWT_HASH,
        signOptions: { expiresIn: '24h' },
      }),
      BlockchainModule
    ],
    controllers: [AuthController],
    providers: [
      ...usersProvider,
      ...videossProvider,
      ...userFollowerProvider,
      ...storesProvider,
      AuthService,
      JwtStrategy,
      LocalStrategy
    ],
  })
  export class AuthModule {}