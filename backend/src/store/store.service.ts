import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/auth/user.entity';
import { Store } from './store.entity';
import { ReviewService } from 'src/review/review.service';
import { UserFollower } from 'src/user/userFollower.entity';
import { Op } from '@sequelize/core';

@Injectable()
export class StoreService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
        @Inject('STORES_REPOSITORY')
        private storesRepository: typeof Store,
        @Inject('USERFOLLOWER_REPOSITORY')
        private userFollowerRepository: typeof UserFollower,
        private reviewService: ReviewService
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

    public async getProductDetail(videoId: string, userId: string) {
        const videoInstance = await this.storesRepository.findOne({
            where: { id: videoId },
            attributes: ['id', 'productName', 'thumbnail', 'cost', 'productDescription', 'tags'],
            include: [{
                attributes: ['id', 'username', 'email'],
                model: User,
            }]
        });
        const otherProducts = await this.storesRepository.findAll({
            where: { id: { [Op.ne]: videoId } },
            limit: 5,
            attributes: ['id', 'productName', 'thumbnail', 'cost', 'productDescription', 'tags'],
            include: [{
                attributes: ['id', 'username', 'email'],
                model: User,
            }]
        });
        const video = videoInstance ? videoInstance.get() : null;

        const isFollowing = await this.userFollowerRepository.findOne({
            where: {
                followerId: userId,
                followingId: video.creator.id
            }
        });
        const followersCount = await this.userFollowerRepository.count({ where: { followingId: video.creator.id } });

        return video ? {
            ...video,
            user: {
                ...video.creator.dataValues,
                following: !!isFollowing,
                followersCount
            },
            review: await this.reviewService.getReview(userId, videoId, true),
            alsoCheckout: otherProducts,
            video: video.cost
        } : null;
    }
}