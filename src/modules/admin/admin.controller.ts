import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from 'src/modules/admin/admin.service';
import { LoginAdminDto } from 'src/modules/admin/dto/login-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post('auth/login')
  // login(@Body loginAdminDto: LoginAdminDto) {}
}
