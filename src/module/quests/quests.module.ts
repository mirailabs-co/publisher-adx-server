import { Module } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { QuestsController } from './quests.controller';
import { QuestsSchema } from './entities/quests.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Quests } from './entities/quests.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quests.name, schema: QuestsSchema }]),
  ],
  controllers: [QuestsController],
  providers: [QuestsService],
})
export class QuestsModule {}
