import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/auth/user.entity';

@Injectable()
export class CommunityService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
    ) { }
}