import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Quests } from 'src/module/quests/entities/quests.entity';
import { Users } from 'src/module/users/users.entity';
import { Apps } from 'src/module/apps/entities/apps.entity';

export enum QuestStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Schema({
  collection: 'user-quest',
})
export class UserQuest extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of user quest',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'The quest id',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Quests.name,
  })
  quest: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    type: 'string',
    description: 'The app id',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Apps.name,
  })
  app: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    type: 'string',
    description: 'The user id',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({
    type: String,
    required: true,
    ref: Users.name,
    index: true,
  })
  user: string;

  @ApiProperty({
    type: 'string',
    description: 'The status of the quest',
    example: 'pending',
  })
  @Prop({
    type: String,
    enum: QuestStatus,
    default: QuestStatus.PENDING,
    index: true,
  })
  status: QuestStatus;

  @ApiProperty({
    type: 'object',
    description: 'The metadata of user',
    example: {},
  })
  @Prop({ type: Object })
  metadata: any;

  @ApiProperty({
    type: 'string',
    description: 'created at',
    example: '2020-10-30T07:00:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'updated at',
    example: '2020-10-30T07:00:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserQuestSchema = SchemaFactory.createForClass(UserQuest);
UserQuestSchema.index({ user: 1, quest: 1 }, { unique: true });
UserQuestSchema.index({ user: 1 });
UserQuestSchema.index({ quest: 1 });
UserQuestSchema.index({ status: 1 });
UserQuestSchema.index({ createdAt: 1 });
