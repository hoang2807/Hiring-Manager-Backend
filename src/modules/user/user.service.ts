import { UpdateApplicationDto } from './../application/dto/update-application.dto';
import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequest, InternalError } from 'src/common/decorator/error';

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

  async update(updateUserDto: UpdateUserDto, cv: string) {
    return this.databaseService.user.update({
      where: {
        id: updateUserDto.id,
      },
      data: {
        username: updateUserDto.username,
        cv,
      },
    });
  }
}
