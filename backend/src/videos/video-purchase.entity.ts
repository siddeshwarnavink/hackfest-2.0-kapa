import { Table, Column, Model, DataType, BelongsTo, Default, ForeignKey } from 'sequelize-typescript';

import { User } from 'src/auth/user.entity';
import { Video } from './videos.entity';

@Table
export class VideoPurchase extends Model {
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
    buyerId: string;
    @BelongsTo(() => User, { as: 'user', foreignKey: 'buyerId' })
    buyer: User;
    
    @ForeignKey(() => Video)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    videoId: string;
    @BelongsTo(() => Video, 'videoId')
    video: Video;    
}