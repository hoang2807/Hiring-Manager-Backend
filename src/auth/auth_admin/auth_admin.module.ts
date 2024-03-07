import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth_admin.service';
import { AuthAdminController } from './auth_admin.controller';
import { AdminModule } from 'src/modules/admin/admin.module';
import { MagicAdminLoginStrategy } from 'src/auth/auth_admin/magiclogin.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/auth_admin/jwt.strategy';
import { LocalStrategy } from 'src/auth/auth_admin/local.auth';

@Module({
  imports: [
    AdminModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthAdminController],
  providers: [
    AuthAdminService,
    MagicAdminLoginStrategy,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthAdminModule {}
