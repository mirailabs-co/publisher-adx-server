import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAccessTokenDto {
  @ApiProperty({
    type: 'string',
    description: 'The address',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
