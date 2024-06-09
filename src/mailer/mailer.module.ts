import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService, JwtService],
})
export class MailerModule {}
