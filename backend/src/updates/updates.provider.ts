import { Review } from './review.entity';

export const reviewsProvider = [
    {
        provide: 'REVIEWS_REPOSITORY',
        useValue: Review,
    },
];