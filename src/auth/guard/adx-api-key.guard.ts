import { AuthGuard } from '@nestjs/passport';

export class AdxApiKeyGuard extends AuthGuard('adx-api-key') {}
