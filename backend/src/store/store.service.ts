import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/auth/user.entity';

@Injectable()
export class StoreService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
    ) { }
}