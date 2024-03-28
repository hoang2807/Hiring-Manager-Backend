import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(private databaseService: DatabaseService) {}
  async create(createApplicationDto: CreateApplicationDto) {
    return this.databaseService.applications.create({
      data: {
        userId: createApplicationDto.userId,
        cv: createApplicationDto.cv,
        score: 0,
        date_of_application: createApplicationDto.date_of_application,
      },
    });
  }
}
