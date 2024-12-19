import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UserProducer {
  constructor(
    @InjectQueue('user-handle-queue')
    private userHandleQueue: Queue,
  ) {}

  async addToLoseSteakQueue(data: any, delay = 0) {
    return this.userHandleQueue.add('lose-steak-handle-job', data, {
      delay,
    });
  }
}
