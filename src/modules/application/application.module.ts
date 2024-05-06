import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { NotificationService } from 'src/modules/notification/notification.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, NotificationGateway, NotificationService],
})
export class ApplicationModule {}
