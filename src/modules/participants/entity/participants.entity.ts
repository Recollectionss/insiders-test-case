import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Event } from '../../event/entities/event.entity';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'Participants', timestamps: false })
export class Participant extends Model<Participant> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.UUID, allowNull: false })
  eventId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => Event)
  event: Event;
}
