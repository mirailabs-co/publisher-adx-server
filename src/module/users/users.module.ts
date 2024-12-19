import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.entity';
import { UserLoginLogs, UserLoginLogsSchema } from './user-login-logs.entity';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserConsumer } from './user.consumer';
import { UserProducer } from './user.producer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
      {
        name: UserLoginLogs.name,
        schema: UserLoginLogsSchema,
      },
    ]),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      name: 'user-handle-queue',
      useFactory: async (configService: ConfigService) => ({
        prefix: configService.get<string>('REDIS_PREFIX'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserProducer, UserConsumer],
  exports: [UsersService, UserProducer, UserConsumer],
})
export class UsersModule {}
