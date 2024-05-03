import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequest, InternalError } from 'src/common/decorator/error';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  @InternalError('Internal Server Error', 'Internal Server Error Description')
  @BadRequest('Bad Request Working', 'Bad Request Description')
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findUserById(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(updateUserDto: UpdateUserDto, avatar: string, cv: string) {
    const data = await this.findUserById(+updateUserDto.id);
    if (avatar && data.avatar !== avatar) {
      await this.databaseService.user.update({
        where: {
          id: +updateUserDto.id,
        },
        data: {
          avatar,
        },
      });

      if (data.avatar)
        fs.unlink(join(process.cwd(), 'upload', data.avatar), (err) => {
          if (err) throw err;
        });
    }
    if (cv && data.cv !== cv) {
      await this.databaseService.user.update({
        where: {
          id: +updateUserDto.id,
        },
        data: {
          cv,
        },
      });

      if (data.cv)
        fs.unlink(join(process.cwd(), 'upload', data.cv), (err) => {
          if (err) throw err;
        });
    }

    return this.databaseService.user.update({
      where: {
        id: +updateUserDto.id,
      },
      data: {
        username: updateUserDto.username,
        phone_number: +updateUserDto.phone,
      },
    });
  }
}
