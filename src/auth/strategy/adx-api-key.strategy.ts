import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class AdxApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'adx-api-key',
) {
  constructor(private authService: AuthService) {
    super({ header: 'adx-api-key', prefix: '' }, true, async (apiKey, done) => {
      if (this.authService.validateAdxApiKey(apiKey)) {
        done(null, true);
      }
      done(new UnauthorizedException(), null);
    });
  }
}
