import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tasks } from './tasks.entity';

@Schema({
  collection: 'task-logs',
})
export class TaskLogs extends Document {
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
  })
  user: string;

  @ApiProperty({
    type: 'string',
    description: 'The task',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Tasks.name,
    index: true,
  })
  task: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    type: 'string',
    description: 'The day of the task',
  })
  @Prop({ type: String })
  day: string;

  @ApiProperty({
    type: 'number',
  })
  @Prop({ type: Number })
  xp: number;

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

export const TaskLogsSchema = SchemaFactory.createForClass(TaskLogs);
TaskLogsSchema.index({ user: 1 });
TaskLogsSchema.index({ task: 1 });
TaskLogsSchema.index({ day: 1 });
