import { Injectable } from '@nestjs/common';

@Injectable()
export class CvService {
  create(createCvDto: CreateCvDto) {
    return 'This action adds a new cv';
  }
}
