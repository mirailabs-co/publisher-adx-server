import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginLogs } from './user-login-logs.entity';
import { Users } from './users.entity';
import { TelegramInitData } from './users.interface';
import * as moment from 'moment';
import { ObjectId } from 'mongodb';
import * as DataLoader from 'dataloader';
import redisDataLoader from 'src/libs/redis-dataloader';
import { getRedisConfig } from 'src/config/redis.config';
import IORedis from 'ioredis';

@Injectable()
export class UsersService {
  private readonly usersLoader;
  constructor(
    @InjectModel(Users.name)
    public readonly usersModel: Model<Users>,

    @InjectModel(UserLoginLogs.name)
    public readonly userLoginLogsModel: Model<UserLoginLogs>,

    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.usersLoader = this.getCustomDataLoader();
  }

  async createOrUpdateUser(data: TelegramInitData) {
    await this.usersModel.updateOne(
      { _id: data.user.id },
      {
        _id: data.user.id,
        username: data.user.username,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        userName: data.user.username,
        user: data.user,
        updatedAt: new Date(),
      },
      { upsert: true },
    );
    await this.createUserLoginLog(data.user.id.toString());
    await this.usersLoader.clear(data.user.id);
    await this.usersLoader.load(data.user.id);
    return this.usersModel.findOne({ _id: data.user.id });
  }

  async createUserLoginLog(userId: string) {
    const checkUserLoginLog = await this.userLoginLogsModel.findOne({
      user: userId,
      day: moment().format('YYYY-MM-DD'),
    });
    if (checkUserLoginLog) {
      checkUserLoginLog.updatedAt = new Date();
      await checkUserLoginLog.save();
      return checkUserLoginLog;
    }
    const newUserLoginLog = await this.userLoginLogsModel.create({
      _id: new ObjectId(),
      user: userId,
      day: moment().format('YYYY-MM-DD'),
    });
    return newUserLoginLog;
  }

  getCustomDataLoader() {
    const batchFn = async (keys: string[]) => {
      const users = await this.usersModel
        .find({
          _id: { $in: keys },
        })
        .lean();
      return keys.map((key) =>
        users.find((user) => user._id.toString() === key.toString()),
      );
    };

    const redis = new IORedis(getRedisConfig());

    const RedisDataLoader = redisDataLoader({ redis, ttl: -1 });

    const loader = new DataLoader(batchFn, { cache: false });

    const userLoader = new RedisDataLoader('dsp-core-user-loader', loader);
    return userLoader;
  }
}
