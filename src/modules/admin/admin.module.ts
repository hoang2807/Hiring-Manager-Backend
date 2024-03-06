import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DatabaseModule } from 'src/database/database.module';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
