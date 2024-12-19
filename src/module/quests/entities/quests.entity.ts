import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum QuestType {
  AD = 'ad',
  TASK = 'task',
}

@Schema({
  collection: 'quests',
})
export class Quests extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'The name of quest',
    example: 'Install app',
  })
  @Prop({ type: String })
  name: string;

  @Prop({
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

export const QuestsSchema = SchemaFactory.createForClass(Quests);
