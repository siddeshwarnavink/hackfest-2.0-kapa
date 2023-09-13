import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { UserFollower } from 'src/user/userFollower.entity';

import { Video } from 'src/videos/videos.entity';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  public id: string;
  @Column
  username: string;
  @Column
  ethereumAddress: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column
  password: string;

  @HasMany(() => Video, { as: 'videos', foreignKey: 'creator' })
  videos: Video[];

  @BelongsToMany(() => User, () => UserFollower, 'followingId')
  followers: User[];

  @BelongsToMany(() => User, () => UserFollower, 'followerId')
  following: User[];
}