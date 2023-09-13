import { Table, Column, Model, DataType, BelongsTo, Default, ForeignKey } from 'sequelize-typescript';

import { User } from 'src/auth/user.entity';

@Table
export class Video extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    public id: string;
    @Column
    title: string;
    @Column
    description: string;
    @Column
    thumbnail: string;
    @Column
    video: string;
    @Column
    watchTime: number;
    @Column
    cost: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    creator: string;
    @BelongsTo(() => User, { as: 'user', foreignKey: 'creator' })
    user: User;

    @Column
    communityId: string;
}