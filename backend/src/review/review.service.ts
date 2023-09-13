import { Injectable, Inject } from '@nestjs/common';
import { Op } from '@sequelize/core';

import { User } from 'src/auth/user.entity';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('REVIEWS_REPOSITORY')
    private reivewsRepository: typeof Review,
  ) { }

  async getReview(userId: string, payload: string, minimal: boolean = false) {
    const userReview = await this.reivewsRepository.findOne({
      where: { authorId: userId },
      include: [{
        attributes: ['id', 'username'],
        model: User,
      }]
    })
    const reviews = minimal ? undefined : await this.reivewsRepository.findAll({
      where: { payload, authorId: { [Op.ne]: userId } },
      include: [{
        attributes: ['id', 'username'],
        model: User,
      }]
    });
    const avgRating = await this.reivewsRepository.aggregate('rating', 'avg', {
      where: { payload },
    });
    return {
      userReview,
      reviews,
      avgRating
    }
  }

  async postReview(userId: string, payload: string, review: { message: string, rating: number }) {
    const newReview = await this.reivewsRepository.create({
      authorId: userId,
      message: review.message,
      rating: review.rating,
      payload
    })
    return {
      message: 'Review posted',
      review: newReview
    };
  }
}
