import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateQuestRewardsLogDto {
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
  @IsString()
  userId: string;
}
