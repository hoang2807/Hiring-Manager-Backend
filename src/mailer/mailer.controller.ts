import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailDto } from 'src/mailer/dto/mail.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('reset-password')
  async sendPasswordResetMail(@Body() mailDto: MailDto) {
    return this.mailerService.sendPasswordResetMail(mailDto);
  }
}
