import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TasksType {
  DAILY_LOGIN = 'daily_login',
  REACT_POST = 'react_post',
  DAILY_REFERRAL = 'daily_referral',
  COMPLETE_ALL_TASKS = 'complete_all_tasks',
  ONCHAIN_CHECK_IN = 'onchain_check_in',
  SPIN_WHEEL_DAILY = 'spin_wheel_daily',
  ONE_TIME_REFERRAL = 'one_time_referral',
  TWO_TIME_REFERRAL = 'two_time_referral',
  TWO_TIME_REFERRAL_2 = 'two_time_referral_2',
  REFERRAL = 'referral',
  COMPLETE_CAMPAIGN = 'complete_campaign',
  LOGIN_STREAK = 'login_streak',
  SPIN_WHEEL = 'spin_wheel',
  LEVEL_UP = 'level_up',
  VISIT_LINK = 'visit_link',
  CONNECT_DISCORD = 'connect_discord',
  CONNECT_X = 'connect_x',
  CONNECT_WALLET = 'connect_wallet',
  START_FARMING = 'start_farming',
  BOOST_FRIEND = 'boost_friend',
  EARN_POINT = 'earn_point',
  JOIN_COMMUNITY_DISCUSSION = 'join_community_discussion',
}

export enum TasksGroup {
  DAILY_TASKS = 'daily_tasks',
  PARTNER_TASKS = 'partner_tasks',
  STREAK_TASKS = 'streak_tasks',
  BASIC_TASKS = 'basic_tasks',
}

export enum TasksStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TasksDailyOrOneTime {
  DAILY = 'daily',
  ONE_TIME = 'one_time',
}
@Schema({
  collection: 'tasks',
})
export class Tasks extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'The type of the task',
  })
  @Prop({ type: String, required: true, enum: TasksType })
  type: TasksType;

  @ApiProperty({
    type: 'string',
    description: 'The type of the task',
  })
  @Prop({ type: String, enum: TasksDailyOrOneTime })
  dailyOrOneTime: TasksDailyOrOneTime;

  @ApiProperty({
    type: 'string',
    description: 'The group of the task',
  })
  @Prop({ type: String, enum: TasksGroup })
  group: TasksGroup;

  @ApiProperty({
    type: 'number',
  })
  @Prop({ type: Number })
  xp: number;

  @ApiProperty({
    type: 'string',
    description: 'The status of the task',
  })
  @Prop({ type: String, enum: TasksStatus })
  status: TasksStatus;

  @ApiProperty({
    type: 'object',
    description: 'metadata of the task',
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

export const TasksSchema = SchemaFactory.createForClass(Tasks);
TasksSchema.index({ type: 1 });
