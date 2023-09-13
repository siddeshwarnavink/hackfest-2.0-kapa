import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

import { User } from '../user.entity';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {
    console.log('KEY: ' + process.env.JWT_HASH);
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_HASH,
    });
  }

  async validate(payload: any) {
    const loggedinUser = await this.usersRepository.findByPk(payload.id);
    if (!loggedinUser) {
      return new UnauthorizedException();
    }
    return loggedinUser;
  }
}
