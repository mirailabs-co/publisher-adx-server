import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdsStatus = 'active' | 'inactive';
@Schema({
  collection: 'ads',
})
export class Ads extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'title',
    example: 'Waifu Pocket',
  })
  @Prop({
    required: true,
    index: true,
  })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'description',
    example: 'Waifu Pocket',
  })
  @Prop({ type: String })
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'status',
    example: 'active',
  })
  @Prop({ type: String, enum: ['active', 'inactive'], default: 'active' })
  status: AdsStatus;

  @ApiProperty({
    type: 'string',
    description: 'url',
    example: 'https://waifupocket.com',
  })
  @Prop({ type: String })
  url: string;

  @ApiProperty({
    type: 'string',
    description: 'campaign',
  })
  @Prop({ type: String })
  campaign: string;

  @ApiProperty({
    type: 'number',
    description: 'weight',
  })
  @Prop({ type: Number })
  weight: number;

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

export const AdsSchema = SchemaFactory.createForClass(Ads);
