import { NotificationGateway } from './../../notification/notification.gateway';
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
  constructor(
    private readonly jobService: JobService,
    private notificationGateway: NotificationGateway,
  ) {}

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
  async pagination(@Query('page') page: string, @Query('take') take: string) {
    this.notificationGateway.emitSendNotification(1, 'hello ');
    return this.jobService.pagination(+page, +take);
  }

  @Get('list/:id')
  async getListJob(@Param('id') id: string) {
    return this.jobService.getListJob(+id);
  }

  // @Get('search/:text/')
  // async search(@Param('text') text: string) {
  //   return this.jobService.search(text);
  // }

  @Post('search')
  async search(@Body('text') text: string, @Body('location') location: string) {
    return this.jobService.search(text, location);
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
