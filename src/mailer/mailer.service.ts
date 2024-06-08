import { MailDto } from './dto/mail.dto';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  mailTransport() {
    const transporter = nodemailer.createTransport({
      port: 587,
      secure: false,
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    return transporter;
  }

  async sendPasswordResetMail(mailDto: MailDto) {
    const resetLink = process.env.BACKEND_HOST;

    const mailOptions: Mail.Options = {
      from: 'hoang12a3td@gmail.com',
      to: mailDto.to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    try {
      const transport = this.mailTransport();
      const result = await transport.sendMail(mailOptions);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
