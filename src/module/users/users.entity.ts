import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
})
export class Users extends Document {
  @ApiProperty({
    type: 'string',
    description: 'The id of document',
    example: '5f9d7a3c9d5f1d0b7c9bce0e',
  })
  @Prop({ type: String })
  _id: string;

  @ApiProperty({
    type: 'string',
    description: 'first name',
  })
  @Prop({ type: String })
  firstName: string;

  @ApiProperty({
    type: 'string',
    description: 'last name',
  })
  @Prop({ type: String })
  lastName: string;

  @ApiProperty({
    type: 'string',
    description: 'username',
  })
  @Prop({ type: String })
  userName: string;

  @ApiProperty({
    type: 'string',
    description: 'avatar',
  })
  @Prop({ type: String })
  avatar: string;

  @ApiProperty({
    type: 'object',
    description: 'telegram user data',
  })
  @Prop({ type: Object })
  user: any;

  @ApiProperty({
    type: 'string',
    description: 'address',
  })
  @Prop({ type: String })
  address: string;

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

export const UsersSchema = SchemaFactory.createForClass(Users);
