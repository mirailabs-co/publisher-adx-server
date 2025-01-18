import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdXWebhookDto {
  @ApiProperty({
    type: 'string',
    description: 'The adsBlockId',
  })
  @IsString()
  adsBlockId: string;

  @ApiProperty({
    type: 'number',
    description: 'The telegramUserId',
  })
  @IsString()
  telegramUserId: string;
}
