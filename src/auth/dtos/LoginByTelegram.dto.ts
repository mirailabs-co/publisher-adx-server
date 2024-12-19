import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginByTelegramDto {
  @ApiProperty({
    type: 'string',
    description: 'The address',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  telegramInitData: string;

  @ApiProperty({
    type: 'string',
    description: 'The app id',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  appId: string;
}
