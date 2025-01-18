import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PointLogs, PointLogsType } from './point-logs.entity';
import { ObjectId } from 'mongodb';
@Injectable()
export class PointLogsService {
  constructor(
    @InjectModel(PointLogs.name) private pointLogsModel: Model<PointLogs>,
  ) {}

  async createPointLogByUser(data: {
    user: string;
    point: number;
    code: string;
  }) {
    const checkAlreadyExist = await this.pointLogsModel.findOne({
      user: data.user,
      type: PointLogsType.TASK,
      'metadata.code': data.code,
    });
    if (checkAlreadyExist) {
      return checkAlreadyExist;
    }
    const newPointLog = await this.pointLogsModel.create({
      _id: new ObjectId(),
      user: data.user,
      point: data.point,
      type: PointLogsType.TASK,
      metadata: { code: data.code },
    });

    return newPointLog;
  }

  async createPointLogByAdXWebhook(data: {
    user: string;
    point: number;
    adsBlockId: string;
  }) {
    const checkAlreadyExist = await this.pointLogsModel.findOne({
      user: data.user,
      type: PointLogsType.QUEST_REWARD,
      'metadata.adsBlockId': data.adsBlockId,
    });

    if (checkAlreadyExist) {
      return checkAlreadyExist;
    }

    const newPointLog = await this.pointLogsModel.create({
      _id: new ObjectId(),
      user: data.user,
      point: data.point,
      type: PointLogsType.QUEST_REWARD,
      metadata: { adsBlockId: data.adsBlockId },
    });

    return newPointLog;
  }

  async createPointLogByQuestReward(data: {
    user: string;
    point: number;
    adId: string;
    logId: string;
  }) {
    const checkAlreadyExist = await this.pointLogsModel.findOne({
      user: data.user,
      type: PointLogsType.QUEST_REWARD,
      'metadata.logId': data.logId,
    });

    if (checkAlreadyExist) {
      return checkAlreadyExist;
    }

    const newPointLog = await this.pointLogsModel.create({
      _id: new ObjectId(),
      user: data.user,
      point: data.point,
      type: PointLogsType.QUEST_REWARD,
      metadata: { adId: data.adId, logId: data.logId },
    });

    return newPointLog;
  }

  async getPointOfUser(userId: string) {
    const query = { user: userId };
    const pointLogs = await this.pointLogsModel.find(query);
    const point = pointLogs.reduce((acc, cur) => acc + cur.point, 0);
    return point;
  }
}
