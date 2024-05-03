import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('cv')
  listCv() {
    return this.userService.listCv();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @Put()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './upload/user',
          filename(req, file, cb) {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let avatar = '',
      cv = '';
    if (files['cv'] && files['cv'][0].fieldname === 'cv')
      cv = files['cv'][0].path.replace('upload/', '');
    if (files['avatar'] && files['avatar'][0].fieldname === 'avatar')
      avatar = files['avatar'][0].path.replace('upload/', '');
    return this.userService.update(updateUserDto, avatar, cv);
  }
}
