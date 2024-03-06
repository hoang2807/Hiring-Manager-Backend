import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(username: string) {
    return this.databaseService.admin.findUnique({
      where: {
        username,
      },
    });
  }
}
