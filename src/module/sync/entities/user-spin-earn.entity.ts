import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EarnType {
  REFERRAL = 'referral',
  LEVEL_UP = 'level_up',
  DAILY_LOGIN = 'daily_login',
  TASK = 'task',
  REFERRAL_BOOST = 'referral_boost',
  BONUS = 'bonus',
  SPIN_SHOP = 'spin_shop',
  SHARE_STORY = 'share_story',
}
@Schema({
  collection: 'user-spin-earn',
})
export class UserSpinEarn extends Document {
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
    index: true,
  })
  user: string;

  @ApiProperty({
    type: 'string',
    description: 'The type of earn',
    example: 'referral',
  })
  @Prop({ type: String, enum: EarnType })
  type: EarnType;

  @ApiProperty({
    type: 'number',
    description: 'The amount of earn',
    example: 100,
  })
  @Prop({ type: Number })
  amount: number;

  @ApiProperty({
    type: 'object',
    description: 'metadata',
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

export const UserSpinEarnSchema = SchemaFactory.createForClass(UserSpinEarn);
UserSpinEarnSchema.index({ user: 1 });
UserSpinEarnSchema.index({ type: 1 });
