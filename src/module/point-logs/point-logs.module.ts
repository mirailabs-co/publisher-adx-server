import { Module } from '@nestjs/common';
import { PointLogsService } from './point-logs.service';
import { PointLogsController } from './point-logs.controller';
import { PointLogs } from './point-logs.entity';
import { PointLogsSchema } from './point-logs.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PointLogs.name, schema: PointLogsSchema },
    ]),
  ],
  controllers: [PointLogsController],
  providers: [PointLogsService],
  exports: [PointLogsService],
})
export class PointLogsModule {}
