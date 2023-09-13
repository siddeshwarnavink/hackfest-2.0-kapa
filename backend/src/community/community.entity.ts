import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';

import { User } from 'src/auth/user.entity';
import { UserCommunity } from './userCommunity.entity';

@Table
export class Community extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  public id: string;

  @Column
  public name: string;

  @Column
  public coordinates: string;

  @BelongsToMany(() => User, () => UserCommunity)
  users: User[];
}
