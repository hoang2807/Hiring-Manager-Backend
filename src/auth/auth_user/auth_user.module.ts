import { Module } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { AuthUserController } from './auth_user.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/auth/auth_user/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/auth/auth_user/strategy/refreshToken.strategy';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  controllers: [AuthUserController],
  providers: [AuthUserService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthUserModule {}
