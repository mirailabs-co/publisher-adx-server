import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PointLogsService } from './point-logs.service';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdXWebhookDto } from './dtos/AdXWebhook.dto';

@Controller('point-logs')
export class PointLogsController {
  constructor(private readonly pointLogsService: PointLogsService) {}

  @ApiTags('Point')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  @Get('point-of-user')
  async getPointOfUser(@Req() req) {
    const userId = req.user._id;
    return this.pointLogsService.getPointOfUser(userId);
  }

  @ApiTags('Point')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  @Post('create-point-log/:point/:code')
  async createPointLog(
    @Req() req,
    @Param('point') point: number,
    @Param('code') code: string,
  ) {
    const userId = req.user._id;
    return this.pointLogsService.createPointLogByUser({
      user: userId,
      point: point,
      code: code,
    });
  }

  @ApiTags('Adx Webhook')
  //   @UseGuards(AdxApiKeyGuard)
  //   @ApiBearerAuth('adx-api-key')
  @Post('adx-webhook')
  async adxWebhook(@Body() body: AdXWebhookDto) {
    return this.pointLogsService.createPointLogByAdXWebhook({
      user: body.telegramUserId,
      point: 100,
      adsBlockId: body.adsBlockId,
    });
  }
}
