import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('forget-password')
  @Render('forget-password')
  async forget_password(
    @Query('email') email: string,
    @Query('token') token: string,
  ) {
    return await this.appService.forget_password(email, token);
  }
}
