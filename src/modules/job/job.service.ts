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
}
