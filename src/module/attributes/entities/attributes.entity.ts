import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum AttributesType {
  BOOLEAN = 'boolean',
  STRING = 'string',
  NUMBER = 'number',
  ENUM = 'enum',
  ARRAY = 'array',
  DATE = 'date',
  OBJECT = 'object',
  COORDINATES = 'coordinates',
}

@Schema({
  collection: 'attributes',
})
export class Attributes extends Document {
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
    example: 'Is Ton user?',
  })
  @Prop({ type: String })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'description',
    example: 'Is Ton user?',
  })
  @Prop({ type: String })
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'key',
    example: 'isTonUser',
  })
  @Prop({ type: String, unique: true })
  key: string;

  @ApiProperty({
    type: 'string',
    description: 'type',
    example: 'boolean',
  })
  @Prop({ type: String })
  type: AttributesType;

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

export const AttributesSchema = SchemaFactory.createForClass(Attributes);
