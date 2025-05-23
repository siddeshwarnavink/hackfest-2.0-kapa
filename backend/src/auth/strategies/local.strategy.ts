import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(phoneNumber, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
