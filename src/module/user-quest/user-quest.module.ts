import { Module } from '@nestjs/common';
import { UserQuestService } from './user-quest.service';
import { UserQuestController } from './user-quest.controller';
import { UserQuestSchema } from './entities/user-quest.entity';
import { UserQuest } from './entities/user-quest.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserQuest.name, schema: UserQuestSchema },
    ]),
  ],
  controllers: [UserQuestController],
  providers: [UserQuestService],
})
export class UserQuestModule {}
