import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from 'src/auth/user.entity';

@Table
export class Review extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  public id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public message: string;

  @Column({
    type: DataType.INTEGER,
    validate: { min: 1, max: 3 },
    allowNull: false,
  })
  public rating: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  authorId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public payload: string;

  @BelongsTo(() => User, 'authorId')
  author: User;
}
