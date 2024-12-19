import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AttributesService } from 'src/module/attributes/attributes.service';
import { AttributesType } from 'src/module/attributes/entities/attributes.entity';
import { SyncService } from 'src/module/sync/sync.service';
import { AdsService } from 'src/module/ads/ads.service';
import { AppsService } from 'src/module/apps/apps.service';
import { AppType } from 'src/module/apps/entities/apps.entity';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);
  const attributesService = application.get(AttributesService);
  const syncService = application.get(SyncService);
  const adsService = application.get(AdsService);
  const appsService = application.get(AppsService);
  const command = process.argv[2];
  switch (command) {
    case 'createAd':
      await adsService.createAd(
        'Ad Example 1',
        'Ad Example 1',
        'https://ad1.com',
        '123',
        1,
        [{ key: 'isTonUser', value: true }],
      );
      await adsService.createAd(
        'Ad Example 2',
        'Ad Example 2',
        'https://ad2.com',
        '123',
        1,
        [
          { key: 'isPaidUser', value: true },
          { key: 'isTonUser', value: false },
        ],
      );
      await adsService.createAd(
        'Ad Example 3',
        'Ad Example 3',
        'https://ad3.com',
        '456',
        1,
        [
          { key: 'isPaidUser', value: true },
          { key: 'isTonUser', value: false },
          { key: 'isPlayMultiAppGame', value: true },
        ],
      );
      await adsService.createAd(
        'Ad Example 4',
        'Ad Example 4',
        'https://ad4.com',
        '789',
        1,
        [
          { key: 'isPaidUser', value: true },
          { key: 'isTonUser', value: false },
          { key: 'isPlayMultiAppGame', value: false },
        ],
      );
      await adsService.createAd(
        'Ad Example 5',
        'Ad Example 5',
        'https://ad5.com',
        '101',
        1,
        [
          { key: 'isPaidUser', value: true },
          { key: 'isTonUser', value: false },
          { key: 'isPlayMultiAppGame', value: false },
        ],
      );
      break;

    case 'getAllAds':
      const ads = await adsService.getAllAds();
      console.log(ads);
      break;

    case 'createApp':
      await appsService.createApp('RewardsHQ', AppType.APP, {});
      break;
    case 'createAttributes':
      await attributesService.createAttributes(
        'User Play Multi App/Game?',
        'Play Multi App/Game',
        'isPlayMultiAppGame',
        AttributesType.BOOLEAN,
      );
      break;
    case 'syncUserAttributesOfTonUsers':
      await syncService.syncUserAttributesOfTonUsers();
      break;
    case 'getAdsByUser':
      const adsByUser = await adsService.getAdsByUser(
        '1303970253',
        '6743ebe13da323661037a7ce',
      );
      console.log(adsByUser);
      break;
    case 'syncUserAttributesOfPaidUsers':
      await syncService.syncUserAttributesOfPaidUsers();
      break;
    case 'syncNumberReferralOfUsers':
      await syncService.syncNumberReferralOfUsers();
      break;
    case 'syncIsPlayMultiAppGameOfUsers':
      await syncService.syncIsPlayMultiAppGameOfUsers();
      break;
    case 'addAppIdToUserAttributes':
      await syncService.addAppIdToUserAttributes();
      break;
    default:
      console.log('Command not found');
      process.exit(1);
  }

  await application.close();
  process.exit(0);
}
bootstrap();
