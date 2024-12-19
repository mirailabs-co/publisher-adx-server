import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { ApiKeyGuard } from 'src/auth/guard/api-key.guard';
import { CreateAdsDto } from './dtos/CreateAds.dto';
import { UpdateAdsDto } from './dtos/UpdateAds.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @ApiTags('Ads')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  @Get('/')
  @ApiOperation({
    description: 'Api get ads by user',
    summary: 'Api get ads by user',
  })
  async getAdsByUser(@Req() req) {
    return this.adsService.getAdsByUser(req.user._id, req.user.appId);
  }

  @ApiTags('Admin')
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth('api-key')
  @Post('/')
  @ApiOperation({
    description: 'Api create ad',
    summary: 'Api create ad',
  })
  async createAd(@Body() body: CreateAdsDto) {
    return this.adsService.createAd(
      body.title,
      body.description,
      body.url,
      body.campaign,
      body.weight,
      body.attributes,
    );
  }

  @ApiTags('Admin')
  @UseGuards(ApiKeyGuard)
  @ApiBearerAuth('api-key')
  @Put('/:id')
  @ApiOperation({
    description: 'Api update ad',
    summary: 'Api update ad',
  })
  async updateAd(@Param('id') id: string, @Body() body: UpdateAdsDto) {
    return this.adsService.updateAd(id, body);
  }
}
