import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'user-login-logs',
})
export class UserLoginLogs extends Document {
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
    ref: UserLoginLogs.name,
  })
  user: string;

  @ApiProperty({
    type: 'string',
    description: 'The day login',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({
    type: String,
    required: true,
  })
  day: string;

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

export const UserLoginLogsSchema = SchemaFactory.createForClass(UserLoginLogs);

UserLoginLogsSchema.index({ user: 1 });
UserLoginLogsSchema.index({ day: 1 });
UserLoginLogsSchema.index({ createdAt: 1 });
UserLoginLogsSchema.index({ user: 1, day: 1 }, { unique: true });
