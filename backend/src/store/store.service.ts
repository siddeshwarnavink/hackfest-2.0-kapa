import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/auth/user.entity';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
        @Inject('STORES_REPOSITORY')
        private storesRepository: typeof Store,
    ) { }

    public getHomeFeed() {
        return this.storesRepository.findAll({
            attributes: ['id', 'productName', 'thumbnail', 'cost', 'productDescription', 'tags'],
            include: [{
                attributes: ['id', 'username'],
                model: User,
            }]
        });
    }
}