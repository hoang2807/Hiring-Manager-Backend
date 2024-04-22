import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from 'src/modules/job/dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(private databaseService: DatabaseService) {}
  async create(createJobDto: CreateJobDto) {
    return this.databaseService.job.create({
      data: createJobDto,
    });
  }

  async update(updateJobDto: UpdateJobDto) {
    const { id, ...data } = updateJobDto;
    return this.databaseService.job.update({
      data,
      where: {
        id,
      },
    });
  }

  async list(id: number) {
    return this.databaseService.job.findMany({
      where: { enterpriseId: id },
    });
  }

  async delete(id: number) {
    return this.databaseService.job.delete({
      where: {
        id,
      },
    });
  }

  async pagination(page: number, take: number) {
    return this.databaseService.job.findMany({
      skip: take * page - take,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getListJob(id: number) {
    return this.databaseService.job.findMany({
      where: {
        enterpriseId: id,
      },
    });
  }

  async getJobById(id: number) {
    return this.databaseService.job.findUnique({
      where: {
        id,
      },
    });
  }

  async search(text: string) {
    return this.databaseService.job.findMany({
      where: {
        OR: [
          {
            title: {
              contains: text,
              mode: 'insensitive',
            },
          },
          {
            skills: {
              contains: text,
              mode: 'insensitive',
            },
          },
          {
            enterpriseName: {
              contains: text,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
}
