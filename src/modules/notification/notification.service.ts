import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private databaseService: DatabaseService) {}
  async list(userId: number) {
    return this.databaseService.notification.findMany({
      where: {
        userId,
      },
    });
  }

  async create(
    userId: number,
    jobId: number,
    enterpriseId: number,
    text: string,
  ) {
    return this.databaseService.notification.create({
      data: {
        userId,
        jobId,
        enterpriseId,
        text,
      },
    });
  }
}
