import { Injectable, Inject } from '@nestjs/common';
import { Op } from '@sequelize/core';

import { User } from 'src/auth/user.entity';
import { Update } from './updates.entity';

@Injectable()
export class UpdatesService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('UPDATES_REPOSITORY')
    private updatesRepository: typeof Update,
  ) { }
}
