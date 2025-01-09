import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginByTelegramDto } from './dtos/LoginByTelegram.dto';
import { RefreshAccessTokenDto } from './dtos/RefreshAccessToken.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  @ApiTags('Auth')
  @Post('/login')
  @ApiOperation({
    description: 'Login by telegram',
    summary: 'Login by telegram',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async loginByTelegram(@Body() body: LoginByTelegramDto) {
    return this.authService.loginByTelegram(body.telegramInitData);
  }

  @ApiTags('Auth')
  @Post('/refresh-token')
  @ApiOperation({
    description: 'Refresh access token',
    summary: 'Refresh access token',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async refreshAccessToken(@Body() body: RefreshAccessTokenDto) {
    return this.authService.refreshAccessToken(body.refreshToken);
  }
}
