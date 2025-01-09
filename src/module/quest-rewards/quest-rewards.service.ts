import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestRewardsLogs } from './quest-rewards-logs.entity';
import { PointLogsService } from '../point-logs/point-logs.service';
import { QuestRewards } from './quest-rewards.entity';
import { ObjectId } from 'mongodb';
@Injectable()
export class QuestRewardsService {
  constructor(
    @InjectModel(QuestRewardsLogs.name)
    private questRewardsLogsModel: Model<QuestRewardsLogs>,

    @InjectModel(QuestRewards.name)
    private questRewardsModel: Model<QuestRewards>,

    private pointLogsService: PointLogsService,
  ) {}

  async createQuestRewardsLog(data: { userId: string; adId: string }) {
    const log = await this.questRewardsLogsModel.create({
      _id: new ObjectId(),
      userId: data.userId,
      adId: data.adId,
    });

    const questRewards = await this.questRewardsModel.findOne({
      adId: data.adId,
    });

    await this.pointLogsService.createPointLogByQuestReward({
      user: data.userId,
      point: questRewards.point,
      adId: data.adId,
      logId: log._id,
    });

    return log;
  }

  async getQuestRewards(adIds: string[]) {
    return this.questRewardsModel.find({
      adId: { $in: adIds },
    });
  }

  async createQuestRewards(adId: string, point: number) {
    return this.questRewardsModel.create({
      _id: new ObjectId(),
      adId: adId,
      point: point,
    });
  }
}
