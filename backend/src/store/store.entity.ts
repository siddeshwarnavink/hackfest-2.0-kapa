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
  export class Store extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
    })
    public id: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    public productName: string;
  
    @Column(DataType.TEXT)
    public productDescription: string;
  
    @Column({
      type: DataType.FLOAT,
      allowNull: false
    })
    public cost: number;
  
    @Column(DataType.STRING)
    public thumbnail: string;
  
    @Column(DataType.STRING)
    public tags: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
      allowNull: false
    })
    public creatorId: string;
  
    @BelongsTo(() => User, 'creatorId')
    public creator: User;
  }
  