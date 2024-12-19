import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History } from './entities/history.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    public readonly historyModel: Model<History>,
  ) {}

  async createHistory(user: string, ad: string, app: string) {
    const history = new this.historyModel({
      _id: new ObjectId(),
      user,
      ad,
      app,
    });
    return history.save();
  }
}
