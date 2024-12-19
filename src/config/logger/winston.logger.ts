import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';
import * as winston from 'winston';
import { utilities } from 'nest-winston';

const label = `${process.env.APP_NAME ?? 'staking-api-prod'}-${process.env.NODE_ENV}`;

export const WinstonLogger: WinstonModuleOptions = {
  transports: [
    new winston.transports.Http({
      host: 'mirailabs-do-logs-prod',
      port: 8888,
      path: '/mirailabs-staking-api-prod',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.label({ label: label }),
        utilities.format.nestLike(label, {
          colors: true,
          prettyPrint: true,
        }),
      ),
      batch: true,
    }),
  ],
};
