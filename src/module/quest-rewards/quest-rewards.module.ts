import { Module } from '@nestjs/common';
import { QuestRewardsService } from './quest-rewards.service';
import { QuestRewardsController } from './quest-rewards.controller';
import { QuestRewards } from './quest-rewards.entity';
import { QuestRewardsSchema } from './quest-rewards.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestRewardsLogsSchema } from './quest-rewards-logs.entity';
import { QuestRewardsLogs } from './quest-rewards-logs.entity';
import { PointLogsModule } from '../point-logs/point-logs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestRewards.name, schema: QuestRewardsSchema },
      { name: QuestRewardsLogs.name, schema: QuestRewardsLogsSchema },
    ]),
    PointLogsModule,
  ],
  controllers: [QuestRewardsController],
  providers: [QuestRewardsService],
  exports: [QuestRewardsService],
})
export class QuestRewardsModule {}
