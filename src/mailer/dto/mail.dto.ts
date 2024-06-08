import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from 'nodemailer/lib/mailer';

export class MailDto {
  @IsNotEmpty()
  @IsString()
  to: string;
}
