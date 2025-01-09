import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Users } from '../users/users.entity';

export enum PointLogsType {
  TASK = 'task',
  QUEST_REWARD = 'quest_reward',
}

@Schema({
  collection: 'point-logs',
})
export class PointLogs extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'The user id',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({
    type: String,
    required: true,
    ref: Users.name,
  })
  user: string;

  @ApiProperty({
    type: 'number',
  })
  @Prop({ type: Number })
  point: number;

  @ApiProperty({
    type: 'number',
  })
  @Prop({ type: Number })
  xp: number;

  @ApiProperty({
    type: 'string',
    description: 'The type of the point logs',
    example: 'referral',
  })
  @Prop({ type: String, enum: PointLogsType })
  type: PointLogsType;

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

export const PointLogsSchema = SchemaFactory.createForClass(PointLogs);

PointLogsSchema.index({ user: 1 });
PointLogsSchema.index({ type: 1 });
PointLogsSchema.index({ createdAt: 1 });
