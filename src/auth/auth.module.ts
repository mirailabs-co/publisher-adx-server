import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MiraiIdStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategy/api-key.strategy';
import { ApiKeyGuard } from './guard/api-key.guard';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/module/users/users.module';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), forwardRef(() => UsersModule)],
  providers: [MiraiIdStrategy, AuthService, ApiKeyStrategy, ApiKeyGuard],
})
export class AuthModule {}
