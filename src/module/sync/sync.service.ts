import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attributes } from '../attributes/entities/attributes.entity';
import { UserAttributes } from '../user-attributes/entities/user-attributes.entity';
import { Users } from '../users/users.entity';
import { ObjectId } from 'mongodb';
import { UserSpinEarn } from './entities/user-spin-earn.entity';
import { TaskLogs } from './entities/task-logs.entity';
import { UserReferral } from './entities/user-referral.entity';
import { Tasks } from './entities/tasks.entity';
import { Apps } from '../apps/entities/apps.entity';

@Injectable()
export class SyncService {
  constructor(
    @InjectModel(Attributes.name)
    public readonly attributesModel: Model<Attributes>,

    @InjectModel(UserAttributes.name)
    public readonly userAttributesModel: Model<UserAttributes>,

    @InjectModel(Users.name)
    public readonly usersModel: Model<Users>,

    @InjectModel(UserSpinEarn.name)
    public readonly userSpinEarnModel: Model<UserSpinEarn>,

    @InjectModel(UserReferral.name)
    public readonly userReferralsModel: Model<UserReferral>,

    @InjectModel(TaskLogs.name)
    public readonly taskLogsModel: Model<TaskLogs>,

    @InjectModel(Tasks.name)
    public readonly tasksModel: Model<Tasks>,

    @InjectModel(Apps.name)
    public readonly appsModel: Model<Apps>,

    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  async syncUserAttributesOfTonUsers() {
    const users = await this.usersModel.find({
      address: { $ne: null },
    });

    const attribute = await this.attributesModel.findOne({
      key: 'isTonUser',
    });

    const userAttributes = users.map((user) => ({
      _id: new ObjectId(),
      user: user._id,
      key: attribute.key,
      value: true,
    }));

    await this.userAttributesModel.insertMany(userAttributes);

    const unTonUsers = await this.usersModel.find({
      address: { $eq: null },
    });

    const unTonUserAttributes = unTonUsers.map((user) => ({
      _id: new ObjectId(),
      user: user._id,
      key: attribute.key,
      value: false,
    }));

    await this.userAttributesModel.insertMany(unTonUserAttributes);
  }

  async syncUserAttributesOfPaidUsers() {
    const usersBySpinShop = await this.userSpinEarnModel.find({
      type: 'spin_shop',
    });
    console.log(usersBySpinShop.length);

    const usersCheckinOnchain = await this.taskLogsModel.find({
      task: new ObjectId('671873cc7dc8d93fefd898ae'),
    });
    console.log(usersCheckinOnchain.length);
    const uniqueUsers = [
      ...new Set([
        ...usersBySpinShop.map((user) => user.user),
        ...usersCheckinOnchain.map((user) => user.user),
      ]),
    ];

    const unPaidUsers = await this.usersModel.find({
      _id: { $nin: uniqueUsers },
    });
    console.log(unPaidUsers.length);
    const attribute = await this.attributesModel.findOne({
      key: 'isPaidUser',
    });

    const list = uniqueUsers.map((user) => ({
      _id: new ObjectId(),
      user: user,
      key: attribute.key,
      value: true,
    }));

    const unPaidUsersIds = unPaidUsers.map((user) => user._id);

    const unPaidUsersAttributes = unPaidUsersIds.map((user) => ({
      _id: new ObjectId(),
      user: user,
      key: attribute.key,
      value: false,
    }));

    await this.userAttributesModel.insertMany([
      ...list,
      ...unPaidUsersAttributes,
    ]);
    return;
  }

  async syncNumberReferralOfUsers() {
    const userReferrals = await this.userReferralsModel.find();

    const list = {};

    userReferrals.forEach((userReferral) => {
      list[userReferral.referralBy] = list[userReferral.referralBy]
        ? list[userReferral.referralBy] + 1
        : 1;
    });

    const attribute = await this.attributesModel.findOne({
      key: 'numberOfReferral',
    });

    const numberReferral = Object.entries(list).map(([referralBy, number]) => ({
      _id: new ObjectId(),
      user: referralBy,
      key: attribute.key,
      value: number,
    }));

    await this.userAttributesModel.insertMany(numberReferral);
  }

  async syncIsPlayMultiAppGameOfUsers() {
    const partnerTasks = await this.tasksModel.find({
      group: 'partner_tasks',
    });

    const taskLogs = await this.taskLogsModel.find({
      task: { $in: partnerTasks.map((task) => task._id) },
    });

    const uniqueUsers = [...new Set(taskLogs.map((taskLog) => taskLog.user))];

    const attribute = await this.attributesModel.findOne({
      key: 'isPlayMultiAppGame',
    });
    const userAttributes = uniqueUsers.map((user) => ({
      _id: new ObjectId(),
      user: user,
      key: attribute.key,
      value: true,
    }));

    await this.userAttributesModel.insertMany(userAttributes);
  }

  async addAppIdToUserAttributes() {
    await this.userAttributesModel.updateMany(
      {},
      { $set: { app: new ObjectId('6743ebe13da323661037a7ce') } },
    );
  }
}
