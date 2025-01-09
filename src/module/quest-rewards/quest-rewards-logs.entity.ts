import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'quest-rewards-logs',
})
export class QuestRewardsLogs extends Document {
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
  @Prop({ type: String, required: true })
  userId: string;

  @ApiProperty({
    type: 'string',
    description: 'The id of the advertisement',
    example: 'ads_123456',
  })
  @Prop({ type: String, required: true })
  adId: string;

  @ApiProperty({
    type: 'string',
    description: 'The created at',
    example: '2024-01-01T00:00:00.000Z',
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuestRewardsLogsSchema =
  SchemaFactory.createForClass(QuestRewardsLogs);
