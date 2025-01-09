import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QuestRewardsService } from './quest-rewards.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guard/api-key.guard';
import { CreateQuestRewardsDto } from './dtos/CreateQuestRewards.dto';
import { GetQuestRewardsDto } from './dtos/GetQuestRewards.dto';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { AdxApiKeyGuard } from 'src/auth/guard/adx-api-key.guard';
import { CreateQuestRewardsLogDto } from './dtos/CreateQuestRewardsLog.dto';

@Controller('quest-rewards')
export class QuestRewardsController {
  constructor(private readonly questRewardsService: QuestRewardsService) {}

  @ApiTags('Admin')
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth('api-key')
  @Post('create')
  async createQuestRewards(@Body() body: CreateQuestRewardsDto) {
    return this.questRewardsService.createQuestRewards(body.adId, body.point);
  }

  @ApiTags('Quest Rewards')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  @Post('get')
  async getQuestRewards(@Body() body: GetQuestRewardsDto) {
    return this.questRewardsService.getQuestRewards(body.adIds);
  }

  @ApiTags('Adx Webhook')
  @UseGuards(AdxApiKeyGuard)
  @ApiBearerAuth('adx-api-key')
  @Post('adx-webhook')
  async adxWebhook(@Body() body: CreateQuestRewardsLogDto) {
    return this.questRewardsService.createQuestRewardsLog(body);
  }
}
