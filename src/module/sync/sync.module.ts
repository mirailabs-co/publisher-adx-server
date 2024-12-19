import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskLogs, TaskLogsSchema } from './entities/task-logs.entity';
import { Tasks, TasksSchema } from './entities/tasks.entity';
import {
  UserReferral,
  UserReferralSchema,
} from './entities/user-referral.entity';
import { Users, UsersSchema } from '../users/users.entity';
import {
  UserLoginLogs,
  UserLoginLogsSchema,
} from '../users/user-login-logs.entity';
import {
  Attributes,
  AttributesSchema,
} from '../attributes/entities/attributes.entity';
import {
  UserAttributes,
  UserAttributesSchema,
} from '../user-attributes/entities/user-attributes.entity';
import {
  UserSpinEarn,
  UserSpinEarnSchema,
} from './entities/user-spin-earn.entity';
import { Apps, AppsSchema } from '../apps/entities/apps.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TaskLogs.name,
        schema: TaskLogsSchema,
      },
      {
        name: Tasks.name,
        schema: TasksSchema,
      },
      {
        name: UserReferral.name,
        schema: UserReferralSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
      {
        name: UserLoginLogs.name,
        schema: UserLoginLogsSchema,
      },
      {
        name: Attributes.name,
        schema: AttributesSchema,
      },
      {
        name: UserAttributes.name,
        schema: UserAttributesSchema,
      },
      {
        name: UserSpinEarn.name,
        schema: UserSpinEarnSchema,
      },
      {
        name: Apps.name,
        schema: AppsSchema,
      },
    ]),
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
