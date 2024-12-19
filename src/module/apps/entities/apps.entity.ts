import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum AppType {
  WALLET = 'wallet',
  EXCHANGE = 'exchange',
  GAME = 'game',
  SOCIAL = 'social',
  UNKNOWN = 'unknown',
  APP = 'app',
}

@Schema({
  collection: 'apps',
})
export class Apps extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'name',
    example: 'Waifu Pocket',
  })
  @Prop({
    required: true,
    index: true,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'type',
    example: 'wallet',
  })
  @Prop({
    required: true,
    enum: AppType,
  })
  type: AppType;

  @ApiProperty({
    type: 'object',
    description: 'metadata',
  })
  @Prop({ type: Object })
  metadata: any;

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

export const AppsSchema = SchemaFactory.createForClass(Apps);
