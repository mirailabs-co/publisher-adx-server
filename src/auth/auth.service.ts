import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { UsersService } from 'src/module/users/users.service';

export enum DiffStartParam {
  LINK_SOCIAL = 'link-social',
  REFERRAL_BOOST = 'referral-boost',
  EARN_HOUR = 'earn-hour',
  LOSE_STEAK = 'lose-steak',
  DAILY_SPIN = 'daily-spin',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(JwtService)
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  validateApiKey(apiKey: string) {
    const key: string = this.configService.get('API_KEY');
    return apiKey === key;
  }

  validateAdxApiKey(apiKey: string) {
    const key: string = this.configService.get('ADX_API_KEY');
    return apiKey === key;
  }

  async loginByTelegram(telegramInitData: string) {
    const data = this.parseTelegramInitData(telegramInitData);
    if (!data) {
      throw new UnauthorizedException();
    }
    const userData = await this.usersService.createOrUpdateUser(data);
    if (!userData) {
      throw new UnauthorizedException();
    }

    const rsaPrivateKey = this.configService.get('PRIVATE_KEY');

    const signData = {
      _id: userData._id,
      createdAt: userData.createdAt,
      firstName: userData.firstName,
      lastName: userData.lastName,
      updatedAt: userData.updatedAt,
      user: userData.user,
      userName: userData.userName,
    };

    const accessToken = this.jwtService.sign(signData, {
      expiresIn: '1h',
      privateKey: rsaPrivateKey,
      algorithm: 'RS256',
    });

    const refreshToken = this.jwtService.sign(signData, {
      expiresIn: '7h',
      privateKey: rsaPrivateKey,
      algorithm: 'RS256',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const rsaPrivateKey = this.configService.get('PRIVATE_KEY');
      const data = this.jwtService.verify(refreshToken, {
        publicKey: rsaPrivateKey,
        algorithms: ['RS256'],
      });

      const refreshData = {
        _id: data._id,
        createdAt: data.createdAt,
        firstName: data.firstName,
        lastName: data.lastName,
        updatedAt: data.updatedAt,
        user: data.user,
        userName: data.userName,
        appId: data.appId,
      };

      const accessToken = this.jwtService.sign(refreshData, {
        expiresIn: '1h',
        privateKey: rsaPrivateKey,
        algorithm: 'RS256',
      });

      const newRefreshToken = this.jwtService.sign(refreshData, {
        expiresIn: '7h',
        privateKey: rsaPrivateKey,
        algorithm: 'RS256',
      });

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  hmac(data: string, key: string | Buffer) {
    return createHmac('sha256', key).update(data).digest();
  }

  parseTelegramInitData(telegramInitData: string) {
    const decodeInitData = decodeURIComponent(telegramInitData);
    const arr = decodeInitData.split('&');
    const hashIndex = arr.findIndex((str) => str.startsWith('hash='));
    const hash = arr.splice(hashIndex)[0]?.split('=')[1];
    arr.sort((a, b) => a.localeCompare(b));
    const telegramSecretKey = this.hmac(
      this.configService.get('TELEGRAM_BOT_TOKEN'),
      'WebAppData',
    );
    const dataCheckString = arr.join('\n');
    const _hash = this.hmac(dataCheckString, telegramSecretKey).toString('hex');
    // if (_hash !== hash) return null;
    const data: Record<string, string> = {};
    arr.map((d) => {
      const [k, v] = d.split('=');
      data[k] = v;
    });
    const res = {
      ...data,
      user: JSON.parse(data.user),
    } as any;
    const deadlineAuthTelegram = Number(res.auth_date) + 60 * 1000;
    if (deadlineAuthTelegram < Date.now() / 1000) return null;
    return res;
  }
}
