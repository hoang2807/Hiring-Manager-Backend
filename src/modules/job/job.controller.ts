import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Put()
  async update(@Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(updateJobDto);
  }

  @Get(':enterpriseId')
  async list(@Param('enterpriseId') id: string) {
    return this.jobService.list(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobService.delete(+id);
  }
}
