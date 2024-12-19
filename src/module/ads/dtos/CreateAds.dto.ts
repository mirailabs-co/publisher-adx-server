import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class Attribute {
  @ApiProperty({
    type: 'string',
    description: 'The key of the attribute',
    example: 'color',
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    type: 'any',
    description: 'The value of the attribute',
    example: 'blue',
  })
  @IsNotEmpty()
  value: any;
}

export class CreateAdsDto {
  @ApiProperty({
    type: 'string',
    description: 'The title of the ad',
    example: 'Summer Sale',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'The description of the ad',
    example: 'Get the best deals this summer!',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: 'string',
    description: 'The URL of the ad',
    example: 'https://example.com/ad',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: 'string',
    description: 'The campaign associated with the ad',
    example: 'Summer Campaign',
  })
  @IsString()
  @IsNotEmpty()
  campaign: string;

  @ApiProperty({
    type: 'number',
    description: 'The weight of the ad',
    example: 10,
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    type: [Attribute],
    description: 'List of attributes for the ad',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Attribute)
  attributes: Attribute[];
}
