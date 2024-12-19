import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { Ads } from './entities/ads.entity';
import { AdsSchema } from './entities/ads.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AdsAttributesSchema } from './entities/ads-attributes.entity';
import { AdsAttributes } from './entities/ads-attributes.entity';
import { UserAttributesModule } from '../user-attributes/user-attributes.module';
import { AppAttributesModule } from '../app-attributes/app-attributes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdsAttributes.name, schema: AdsAttributesSchema },
      { name: Ads.name, schema: AdsSchema },
    ]),
    UserAttributesModule,
    AppAttributesModule,
  ],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
