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

@Module({
  imports: [
    // AdminModule,
    DatabaseModule,
    UserModule,
    AuthAdminModule,
    AuthUserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JobModule,
    EnterpriseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
