import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateQuestRewardsDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of the quest',
  })
  @IsString()
  adId: string;

  @ApiProperty({
    type: 'number',
    description: 'The point of the quest',
  })
  @IsNumber()
  point: number;
}
