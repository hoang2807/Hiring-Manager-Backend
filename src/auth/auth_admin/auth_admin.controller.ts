import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthAdminService } from './auth_admin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth-admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authAdminService.login(email, password);
  }

  @Post('signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('enterpriseId') enterpriseId: number,
  ) {
    return await this.authAdminService.createUser(
      username,
      email,
      password,
      enterpriseId,
    );
  }

  // @UseGuards(AuthGuard('magiclogin'))
  // @Get('login/callback')
  // callback(@Req() req) {
  //   return this.authAdminService.generateToken(req.user);
  // }
}
