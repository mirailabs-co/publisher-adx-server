import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import * as DataLoader from 'dataloader';
import IORedis from 'ioredis';
import { getRedisConfig } from 'src/config/redis.config';
import redisDataLoader from 'src/libs/redis-dataloader';
import { Apps, AppType } from './entities/apps.entity';

@Injectable()
export class AppsService {
  private readonly appsLoader;

  constructor(
    @InjectModel(Apps.name)
    public readonly appModel: Model<Apps>,
  ) {
    this.appsLoader = this.getCustomDataLoader();
  }

  async createApp(name: string, type: AppType, metadata: any) {
    const app = new this.appModel({
      _id: new ObjectId(),
      name,
      type,
      metadata,
    });
    await app.save();
    const appResult = await this.appsLoader.load(app._id.toString());
    return appResult;
  }

  async getAppById(id: string) {
    const app = await this.appsLoader.load(id);
    return app;
  }

  getCustomDataLoader() {
    const batchFn = async (keys: string[]) => {
      const apps = await this.appModel
        .find({
          _id: { $in: keys },
        })
        .lean();
      return keys.map((key) => apps.find((app) => app._id.toString() === key));
    };

    const redis = new IORedis(getRedisConfig());
    const RedisDataLoader = redisDataLoader({ redis, ttl: -1 });
    const loader = new DataLoader(batchFn, { cache: false });
    const appsLoader = new RedisDataLoader('dsp-core-apps-loader', loader);
    return appsLoader;
  }
}
