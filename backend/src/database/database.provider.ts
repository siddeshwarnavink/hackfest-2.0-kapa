import { Sequelize } from 'sequelize-typescript';

import { User } from '../auth/user.entity';
import { Video } from 'src/videos/videos.entity';
import { VideoPurchase } from 'src/videos/video-purchase.entity';
import { UserFollower } from 'src/user/userFollower.entity';
import { Review } from 'src/review/review.entity';
import { Store } from 'src/store/store.entity';
import { Community } from 'src/community/community.entity';
import { UserCommunity } from 'src/community/userCommunity.entity';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
      });
      sequelize.addModels([
        User,
        Video,
        VideoPurchase,
        UserFollower,
        Review,
        Store,
        Community,
        UserCommunity
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
