import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { DownloadCvDto } from 'src/modules/cv/dto/download.dto';
import type { Response } from 'express';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  download(
    @Res({ passthrough: true }) res: Response,
    //    @Body() downloadCvDto: DownloadCvDto,
  ) {
    //    const path = downloadCvDto.path;
    const path = 'apply/752e932b3efe10defa33b256951cd126e.png';
    const file = createReadStream(join(process.cwd(), 'upload', path));
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${path.slice(
        path.lastIndexOf('/') + 1,
      )}"`,
    });
    // file.pipe(res);

    return new StreamableFile(file);
  }
}
