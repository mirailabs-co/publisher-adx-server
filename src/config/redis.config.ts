import { RedisOptions } from 'ioredis';

export const getRedisConfig = () => {
  const isProduction = process.env.APP_TYPE === 'prod';
  return {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME || 'default',
    tls: isProduction ? {} : undefined,
  } as unknown as RedisOptions;
};
