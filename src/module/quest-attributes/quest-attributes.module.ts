import { Module } from '@nestjs/common';
import { QuestAttributesService } from './quest-attributes.service';
import { QuestAttributesController } from './quest-attributes.controller';
import { QuestAttributesSchema } from './entities/quest-attributes.entity';
import { QuestAttributes } from './entities/quest-attributes.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestAttributes.name, schema: QuestAttributesSchema },
    ]),
  ],
  controllers: [QuestAttributesController],
  providers: [QuestAttributesService],
})
export class QuestAttributesModule {}
