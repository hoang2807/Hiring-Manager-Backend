import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from 'src/modules/application/dto/update-application.dto';
import { Status } from '@prisma/client';

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

  async updateStatus(id: number, updateApplicationDto: UpdateApplicationDto) {
    const status = (await this.getStatusCode(id)).status;
    if (status === 'NOT_SEEN')
      return await this.databaseService.applications.update({
        where: {
          id,
        },
        data: {
          status: updateApplicationDto.status,
        },
      });
    if (status === 'WATCHED' && updateApplicationDto.status !== 'WATCHED')
      return await this.databaseService.applications.update({
        where: {
          id,
        },
        data: {
          status: updateApplicationDto.status,
        },
      });
    if (
      (status === 'NOT_SUITABLE' || status === 'SUITABLE') &&
      updateApplicationDto.status !== 'WATCHED'
    )
      return await this.databaseService.applications.update({
        where: {
          id,
        },
        data: {
          status: updateApplicationDto.status,
        },
      });
    return await this.databaseService.applications.findUnique({
      where: {
        id,
      },
    });
  }

  async getStatusCode(id: number) {
    return this.databaseService.applications.findUnique({
      where: {
        id,
      },
      select: {
        status: true,
        score: true,
      },
    });
  }
}
