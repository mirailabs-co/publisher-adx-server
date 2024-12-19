import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of the quest',
  })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: 'object',
    description: 'metadata',
  })
  @IsOptional()
  @IsObject()
  metadata: any;
}
