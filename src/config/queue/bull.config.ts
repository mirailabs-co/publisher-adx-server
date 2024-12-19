import {
  BullModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(private configService: ConfigService) {}

  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.configService.get<string>('REDIS_HOST'),
        password: this.configService.get<string>('REDIS_PASSWORD'),
        port: this.configService.get<number>('REDIS_PORT'),
        keyPrefix: `${this.configService.get<string>(
          'NODE_ENV',
        )}:${this.configService.get<string>('REDIS_PREFIX')}:`,
        db: this.configService.get<number>('REDIS_QUEUE_DB') || 0,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 500,
        removeOnFail: 1000,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    } as BullModuleOptions;
  }
}
