import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthAdminModule } from 'src/auth/auth_admin/auth_admin.module';
import { AuthUserModule } from 'src/auth/auth_user/auth_user.module';
import { JobModule } from './modules/job/job.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { ApplicationModule } from './modules/application/application.module';
import { NotificationGateway } from './notification/notification.gateway';
import { CvModule } from './modules/cv/cv.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    // AdminModule,
    DatabaseModule,
    UserModule,
    AuthAdminModule,
    AuthUserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({}),
    JobModule,
    EnterpriseModule,
    ApplicationModule,
    CvModule,
    NotificationModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationGateway, JwtService],
})
export class AppModule {}
