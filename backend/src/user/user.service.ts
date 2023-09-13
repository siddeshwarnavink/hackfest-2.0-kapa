import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UserFollower } from './userFollower.entity';
import { User } from 'src/auth/user.entity';
import { Video } from 'src/videos/videos.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
        @Inject('VIDEOS_REPOSITORY')
        private videosRepository: typeof Video,
        @Inject('USERFOLLOWER_REPOSITORY')
        private userFollowerRepository: typeof UserFollower,
    ) { }

    async getUserProfile(loggedinUserId: string, userId: string) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const videoCount = await this.videosRepository.count({ where: { creator: userId } });
        const videos = await this.videosRepository.findAll({
            attributes: ['id', 'title', 'thumbnail'],
            where: { creator: userId },
        });

        const isFollowing = await this.userFollowerRepository.findOne({
            where: {
                followerId: loggedinUserId,
                followingId: userId
            }
        });

        const followersCount = await this.userFollowerRepository.count({ where: { followingId: userId } });

        return {
            profile: {
                id: userId,
                username: user.username,
                email: user.email,
            },
            following: !!isFollowing,  // Convert to boolean. True if the record exists, otherwise false
            statistics: {
                videos: videoCount,
                followers: followersCount,  // Updated to provide actual count
                products: 0
            },
            videos,
        };
    }


    async followUser(userId: string, followId: string) {
        const existingRelation = await this.userFollowerRepository.findOne({
            where: {
                followerId: userId,
                followingId: followId
            }
        });
        if (existingRelation) {
            throw new Error('Already following this user.');
        }
        return this.userFollowerRepository.create({
            followerId: userId,
            followingId: followId
        });
    }

    async unfollowUser(userId: string, followId: string) {
        const existingRelation = await this.userFollowerRepository.findOne({
            where: {
                followerId: userId,
                followingId: followId
            }
        });

        if (!existingRelation) {
            throw new NotFoundException('Not following this user.');
        }

        return existingRelation.destroy();
    }
}