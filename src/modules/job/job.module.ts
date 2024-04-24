import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationGateway } from 'src/notification/notification.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [JobController],
  providers: [JobService, NotificationGateway],
})
export class JobModule {}
