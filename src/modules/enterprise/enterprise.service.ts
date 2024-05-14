import { DatabaseService } from 'src/database/database.service';
import {
  Injectable,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';

@Injectable()
export class EnterpriseService {
  constructor(private databaseService: DatabaseService) {}

  async getById(id: number) {
    return this.databaseService.enterprise.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateEnterpriseDto: UpdateEnterpriseDto,
    path: string,
  ) {
    const file = await this.databaseService.enterprise.findUnique({
      where: {
        id,
      },
    });
    let image = '';
    if (path) image = path;
    else image = file.image;
    return this.databaseService.enterprise.update({
      where: {
        id,
      },
      data: {
        address: updateEnterpriseDto.address,
        about_me: updateEnterpriseDto.about_me,
        image,
      },
    });
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../../upload/enterprise',
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
  async upload(@UploadedFile() file) {
    console.log(file);
  }

  async getPhoto(path: string) {
    const imageLocation = join(process.cwd(), 'upload', path);

    const file = createReadStream(imageLocation);
    return new StreamableFile(file);
  }
}
