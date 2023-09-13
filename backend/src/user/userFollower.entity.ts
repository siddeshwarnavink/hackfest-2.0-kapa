import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsToMany
  } from 'sequelize-typescript';

import { User } from 'src/auth/user.entity';
  
  @Table
  export class UserFollower extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
    })
    public id: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    followerId: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    followingId: string;
  }
  