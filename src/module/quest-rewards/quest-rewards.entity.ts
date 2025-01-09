import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'quest-rewards',
})
export class QuestRewards extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'The id of the advertisement',
    example: 'ads_123456',
  })
  @Prop({ type: String, required: true })
  adId: string;

  @ApiProperty({
    type: 'number',
    description: 'The points associated with the advertisement',
    example: 100,
  })
  @Prop({ type: Number, required: true })
  point: number;
}

export const QuestRewardsSchema = SchemaFactory.createForClass(QuestRewards);
