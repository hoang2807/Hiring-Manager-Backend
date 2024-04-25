import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(private databaseService: DatabaseService) {}
  async create(createApplicationDto: CreateApplicationDto, cv: string) {
    return this.databaseService.applications.create({
      data: {
        userId: +createApplicationDto.userId,
        cv: cv.replace('upload/', ''),
        score: 0,
        jobId: +createApplicationDto.jobId,
        enterpriseId: +createApplicationDto.enterpriseId,
      },
    });
  }

  async list(enterpriseId: number) {
    return this.databaseService.applications.findMany({
      where: {
        enterpriseId,
      },
    });
  }

  async listJob(enterpriseId: number, jobId: number) {
    return this.databaseService.applications.findMany({
      where: {
        enterpriseId,
        jobId,
      },
    });
  }
}
