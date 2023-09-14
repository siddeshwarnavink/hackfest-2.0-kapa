import { Inject, Injectable } from '@nestjs/common';

import { Video } from './videos.entity';
import { User } from 'src/auth/user.entity';
import { VideoPurchase } from './video-purchase.entity';
import { UserFollower } from 'src/user/userFollower.entity';
import { ReviewService } from 'src/review/review.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class VideosService {
    constructor(
        @Inject('VIDEOS_REPOSITORY')
        private videosRepository: typeof Video,
        @Inject('VIDEOSPURCHASE_REPOSITORY')
        private videosPurchaseRepository: typeof VideoPurchase,
        @Inject('USERFOLLOWER_REPOSITORY')
        private userFollowerRepository: typeof UserFollower,
        private reviewService: ReviewService
    ) { }

    public getHomeFeed(communityId: string) {
        return this.videosRepository.findAll({
            attributes: ['id', 'title', 'thumbnail', 'cost', 'watchTime', 'communityId'],
            include: [{
                attributes: ['id', 'username'],
                model: User,
            }],
            order: [
                [Sequelize.literal(`(CASE WHEN communityId = '${communityId}' THEN 1 ELSE 0 END)`), 'DESC']
            ]
        });
    }

    public async postVideo(videoData: any) {
        const newVideo = await this.videosRepository.create(videoData);

        return {
            message: 'Video uploaded.',
            videoId: newVideo.id
        }
    }

    public async getVideoDetail(videoId: string, userId: string) {
        const isVideoPurchasedInstance = await this.videosPurchaseRepository.findOne({
            where: { buyerId: userId, videoId }
        });
        const isVideoPurchased = isVideoPurchasedInstance ? isVideoPurchasedInstance.get() : null;

        const videoInstance = await this.videosRepository.findOne({
            where: { id: videoId },
            attributes: ['id', 'title', 'thumbnail', 'cost', 'creator', 'watchTime', 'video', 'createdAt', 'description'],
            include: [{
                attributes: ['id', 'username', 'email'],
                model: User,
            }]
        });
        const video = videoInstance ? videoInstance.get() : null;

        const isFollowing = await this.userFollowerRepository.findOne({
            where: {
                followerId: userId,
                followingId: video.user.id
            }
        });
        const followersCount = await this.userFollowerRepository.count({ where: { followingId: video.user.id } });

        return video ? {
            ...video,
            user: {
                ...video.user.dataValues,
                following: !!isFollowing,
                followersCount
            },
            review: await this.reviewService.getReview(userId, videoId, true),
            video: video.cost === 0 || (isVideoPurchased || video.creator === userId) ? video.video : null
        } : null;
    }

    public async updateVideoDetail(videoData: any) {
        const selectedVideo = await this.videosRepository.findOne({ where: { id: videoData.id } });
        await selectedVideo.update(videoData);
        return {
            message: 'Video updated successfully!',
            video: videoData
        }

    }
}
