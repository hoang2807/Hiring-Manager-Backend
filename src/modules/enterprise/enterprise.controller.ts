import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.enterpriseService.getById(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/enterprise',
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
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterpriseService.update(+id, updateEnterpriseDto, file.path);
  }
}
