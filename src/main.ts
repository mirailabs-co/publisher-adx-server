import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? false
        : ['error', 'debug', 'warn', 'verbose', 'log'],
    bodyParser: true,
    cors: true,
  });

  const configService = app.get<ConfigService>(ConfigService);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
      dismissDefaultMessages: false,
      exceptionFactory: (errors) => {
        const error = errors.map((e) => Object.values(e.constraints)[0]);
        return new BadRequestException(error[0]);
      },
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use('/health', (req, res) => {
    res.status(200).send('OK');
  });

  const config = new DocumentBuilder()
    .setTitle('Telegram App API')
    .setDescription('Telegram App API description')
    .addBearerAuth(undefined, 'access-token')
    .addApiKey(undefined, 'api-key')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get<number>('PORT') || 3000;
  app.enableCors();
  app.getHttpAdapter().getInstance().set('etag', false);
  await app.listen(port);
  console.info(`Application is running on: ${await app.getUrl()}/swagger`);
}

bootstrap().finally(() => {});
