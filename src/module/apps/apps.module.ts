import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apps, AppsSchema } from './entities/apps.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Apps.name, schema: AppsSchema }]),
  ],
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
