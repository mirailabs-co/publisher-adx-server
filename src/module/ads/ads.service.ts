import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ads } from './entities/ads.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { getRedisConfig } from 'src/config/redis.config';
import IORedis from 'ioredis';
import redisDataLoader from 'src/libs/redis-dataloader';
import * as DataLoader from 'dataloader';
import { ObjectId } from 'mongodb';
import { AdsAttributes } from './entities/ads-attributes.entity';
import { UserAttributesService } from '../user-attributes/user-attributes.service';
import { AppAttributesService } from '../app-attributes/app-attributes.service';
import { UpdateAdsDto } from './dtos/UpdateAds.dto';

@Injectable()
export class AdsService {
  private readonly adsLoader;
  constructor(
    @InjectModel(Ads.name)
    public readonly adsModel: Model<Ads>,

    @InjectModel(AdsAttributes.name)
    public readonly adsAttributesModel: Model<AdsAttributes>,

    @Inject(UserAttributesService)
    private readonly userAttributesService: UserAttributesService,

    @Inject(AppAttributesService)
    private readonly appAttributesService: AppAttributesService,

    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.adsLoader = this.getCustomDataLoader();
  }

  async createAd(
    title: string,
    description: string,
    url: string,
    campaign: string,
    weight: number,
    attributes: { key: string; value: any }[],
  ) {
    const ad = new this.adsModel({
      _id: new ObjectId(),
      title,
      description,
      url,
      campaign,
      weight,
    });
    await ad.save();
    const adsAttributes = attributes.map((attribute) => ({
      _id: new ObjectId(),
      ads: ad._id,
      key: attribute.key,
      value: attribute.value,
    }));

    await this.adsAttributesModel.insertMany(adsAttributes);
  }

  async updateAd(id: string, data: UpdateAdsDto) {
    await this.adsModel.findByIdAndUpdate(id, data);
    const adsAttributes = await this.adsAttributesModel.find({ ads: id });
    const upsertAdsAttributes = [];
    for (const attribute of data.attributes) {
      const existingAttribute = adsAttributes.find(
        (attr) => attr.key === attribute.key,
      );
      if (existingAttribute) {
        existingAttribute.value = attribute.value;
        upsertAdsAttributes.push(existingAttribute);
      } else {
        upsertAdsAttributes.push({ _id: new ObjectId(), ...attribute });
      }
    }
    const bulkWrite = upsertAdsAttributes.map((attribute) => ({
      updateOne: {
        filter: { _id: attribute._id },
        update: { $setOnInsert: attribute },
        upsert: true,
      },
    }));
    await this.adsAttributesModel.bulkWrite(bulkWrite);
  }

  async getAdById(id: string) {
    const ad = await this.adsLoader.load(id);
    return ad;
  }

  async getAllAds() {
    return this.adsModel.find();
  }

  async getAdsByUser(userId: string, appId: string) {
    const listAds = await this.adsModel.find();
    const listAdsAttributes = await this.adsAttributesModel.find();
    const userAttributes =
      await this.userAttributesService.getUserAttributes(userId);
    const appAttributes =
      await this.appAttributesService.getAppAttributes(appId);

    const adsWithMatchScore = listAds.map((ad) => {
      const attributes = listAdsAttributes.filter(
        (attr) => attr.ads.toString() === ad._id.toString(),
      );
      const matchScore = attributes.reduce((score, attr) => {
        return (
          score +
          (userAttributes.some(
            (userAttr) =>
              userAttr.key === attr.key && userAttr.value === attr.value,
          )
            ? 1
            : 0)
        );
      }, 0);
      return { ad, matchScore };
    });

    return adsWithMatchScore.sort((a, b) => b.matchScore - a.matchScore);
  }

  getCustomDataLoader() {
    const batchFn = async (keys: string[]) => {
      const ads = await this.adsModel
        .find({
          _id: { $in: keys },
        })
        .lean();
      return keys.map((key) => ads.find((ad) => ad._id.toString() === key));
    };

    const redis = new IORedis(getRedisConfig());

    const RedisDataLoader = redisDataLoader({ redis, ttl: -1 });

    const loader = new DataLoader(batchFn, { cache: false });

    const adsLoader = new RedisDataLoader('dsp-core-ads-loader', loader);
    return adsLoader;
  }
}
