import { PartialType } from '@nestjs/swagger';
import { CreateAdsDto } from './CreateAds.dto';

export class UpdateAdsDto extends PartialType(CreateAdsDto) {}
