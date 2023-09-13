import { Inject, Injectable } from '@nestjs/common';

import { User } from 'src/auth/user.entity';
import { Community } from './community.entity';
import { UserCommunity } from './userCommunity.entity';

@Injectable()
export class CommunityService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
        @Inject('COMMUNITY_REPOSITORY')
        private communityRepository: typeof Community,
        @Inject('USERCOMMUNITY_REPOSITORY')
        private usersCommunityRepository: typeof UserCommunity,
    ) { }

    async get(userId: string) {
        return await this.communityRepository.findAll();
    }
}