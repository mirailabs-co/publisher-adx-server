import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class GetQuestRewardsDto {
  @ApiProperty({
    type: 'string',
    description: 'The list ad ids',
  })
  @IsArray()
  @IsString({ each: true })
  adIds: string[];
}
