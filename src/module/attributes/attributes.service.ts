import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attributes, AttributesType } from './entities/attributes.entity';
import { ObjectId } from 'mongodb';
import * as DataLoader from 'dataloader';
import redisDataLoader from 'src/libs/redis-dataloader';
import { getRedisConfig } from 'src/config/redis.config';
import IORedis from 'ioredis';

@Injectable()
export class AttributesService {
  private readonly attributesLoader;
  constructor(
    @InjectModel(Attributes.name)
    public readonly attributesModel: Model<Attributes>,

    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.attributesLoader = this.getCustomDataLoader();
  }

  async createAttributes(
    name: string,
    description: string,
    key: string,
    type: AttributesType,
  ) {
    const attributes = new this.attributesModel({
      _id: new ObjectId(),
      name,
      description,
      key,
      type,
    });
    await attributes.save();
    const attribute = await this.attributesLoader.load(attributes.key);
    return attribute;
  }

  async getAttributesByKey(key: string) {
    return this.attributesLoader.load(key);
  }

  getCustomDataLoader() {
    const batchFn = async (keys: string[]) => {
      const users = await this.attributesModel
        .find({
          key: { $in: keys },
        })
        .lean();
      return keys.map((key) => users.find((user) => user.key === key));
    };

    const redis = new IORedis(getRedisConfig());

    const RedisDataLoader = redisDataLoader({ redis, ttl: -1 });

    const loader = new DataLoader(batchFn, { cache: false });

    const attributesLoader = new RedisDataLoader(
      'dsp-core-attributes-loader',
      loader,
    );
    return attributesLoader;
  }
}
