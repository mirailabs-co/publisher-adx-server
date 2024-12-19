import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Ads } from './ads.entity';

@Schema({
  collection: 'ads-attributes',
})
export class AdsAttributes extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'The ads',
    example: '1234242144',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Ads.name,
    index: true,
  })
  ads: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    type: 'string',
    description: 'key',
    example: 'isTonUser',
  })
  @Prop({
    required: true,
    index: true,
  })
  key: string;

  @ApiProperty({
    type: 'string',
    description: 'value',
    example: 'true',
  })
  @Prop({
    required: true,
    type: MongooseSchema.Types.Mixed,
  })
  value: any;

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

export const AdsAttributesSchema = SchemaFactory.createForClass(AdsAttributes);
