import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';

import { Community } from './community.entity';
import { User } from 'src/auth/user.entity';

@Table
export class UserCommunity extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  userId: string;

  @ForeignKey(() => Community)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  communityId: string;
  @BelongsTo(() => Community, { as: 'community', foreignKey: 'communityId' })
  community: Community;
}
