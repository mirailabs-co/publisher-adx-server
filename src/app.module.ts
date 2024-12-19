import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { WinstonModule } from 'nest-winston';
import { WinstonLogger } from './config/logger/winston.logger';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { BullConfigService } from './config/queue/bull.config';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserAttributesModule } from './module/user-attributes/user-attributes.module';
import { AttributesModule } from './module/attributes/attributes.module';
import { AdsModule } from './module/ads/ads.module';
import { AppsModule } from './module/apps/apps.module';
import { SyncModule } from './module/sync/sync.module';
import { AppAttributesModule } from './module/app-attributes/app-attributes.module';
import { QuestsModule } from './module/quests/quests.module';
import { UserQuestModule } from './module/user-quest/user-quest.module';
import { QuestAttributesModule } from './module/quest-attributes/quest-attributes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    {
      global: true,
      ...HttpModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          timeout: configService.get('HTTP_TIMEOUT'),
          baseURL: configService.get('HTTP_BASE_URL'),
        }),
        inject: [ConfigService],
      }),
    },
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ): CacheModuleOptions<RedisClientOptions> => ({
        database: 0,
        store: redisStore.redisStore,
        url:
          'redis://' +
          configService.get<string>('REDIS_HOST') +
          ':' +
          configService.get<string>('REDIS_PORT'),
        ttl: 0,
        username: configService.get<string>('REDIS_USERNAME'),
        password: configService.get<string>('REDIS_PASSWORD'),
        clientInfoTag: 'rewards-hq',
      }),
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot(WinstonLogger),
    UsersModule,
    AuthModule,
    UserAttributesModule,
    AttributesModule,
    AdsModule,
    AppsModule,
    SyncModule,
    AppAttributesModule,
    QuestsModule,
    UserQuestModule,
    QuestAttributesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {}
}
