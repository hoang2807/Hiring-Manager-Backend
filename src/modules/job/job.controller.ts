import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // @Get()
  // async test() {
  //   return 'test';
  // }

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Put()
  async update(@Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(updateJobDto);
  }

  @Get('pagination')
  async pagination(
    @Query('skip') page: string,
    @Query('skip') skip: string,
    @Query('take') take: string,
  ) {
    return this.jobService.pagination(+page, +skip, +take);
  }

  @Get('list/:id')
  async getListJob(@Param('id') id: string) {
    return this.jobService.getListJob(+id);
  }

  @Get(':id')
  async getJobById(@Param('id') id: string) {
    return this.jobService.getJobById(+id);
  }

  // @Get(':enterpriseId')
  // async list(@Param('enterpriseId') id: string) {
  //   return this.jobService.list(+id);
  // }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobService.delete(+id);
  }
}
