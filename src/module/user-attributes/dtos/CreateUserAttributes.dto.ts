import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
    type: 'string',
    description: 'The value of the attribute',
    example: 'blue',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateUserAttributesDto {
  @ApiProperty({
    type: [Attribute],
    description: 'List of user attributes',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Attribute)
  attributes: Attribute[];
}
