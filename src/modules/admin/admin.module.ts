import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DatabaseModule } from 'src/database/database.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
