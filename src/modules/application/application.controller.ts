import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from 'src/modules/application/dto/update-application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/apply',
        filename(req, file, cb) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() createApplicationDto: CreateApplicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.applicationService.create(
      createApplicationDto,
      file.path.replace('upload/', ''),
    );
  }

  @Get('')
  async listJob(
    @Query('enterpriseId') enterpriseId: string,
    @Query('jobId') jobId: string,
  ) {
    return this.applicationService.listJob(+enterpriseId, +jobId);
  }

  @Get(':id')
  async list(@Param('id') id: string) {
    return this.applicationService.list(+id);
  }

  @Put('status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.updateStatus(+id, updateApplicationDto);
  }

  @Put('score/:id')
  async updateScore(@Param('id') id: string, @Body('score') score: number) {
    return this.applicationService.updateScore(+id, score);
  }

  @Get('status/:id')
  async getStatus(@Param('id') id: string) {
    return this.applicationService.getStatusCode(+id);
  }
}
