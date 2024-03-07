import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from 'src/modules/admin/admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post('auth/login')
  // login(@Body loginAdminDto: LoginAdminDto) {}

  @Get('test')
  test() {
    throw new UnauthorizedException();
  }
}
