import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOneByEmail(email: string) {
    return await this.databaseService.admin.findUnique({
      where: {
        email,
      },
    });
  }
}
