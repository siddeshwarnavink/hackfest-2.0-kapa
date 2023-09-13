import { User } from './user.entity';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];