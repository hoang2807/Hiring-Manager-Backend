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
        cv,
        score: 0,
        jobId: +createApplicationDto.jobId,
        enterpriseId: +createApplicationDto.enterpriseId,
        fullName: createApplicationDto.fullName,
        email: createApplicationDto.email,
        phone_number: createApplicationDto.phone_number,
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
