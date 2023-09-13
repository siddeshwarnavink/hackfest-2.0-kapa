import { UserFollower } from './userFollower.entity';

export const userFollowerProvider = [
  {
    provide: 'USERFOLLOWER_REPOSITORY',
    useValue: UserFollower,
  },
];