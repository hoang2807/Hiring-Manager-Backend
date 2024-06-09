import { UserService } from './../modules/user/user.service';
import { MailDto } from './dto/mail.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
// import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  mailTransport() {
    console.log(process.env.USER, process.env.PASS);
    const transporter = nodemailer.createTransport({
      port: 465,
      secure: false,
      host: 'smtp.gmail.com',
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    return transporter;
  }

  async sendPasswordResetMail(mailDto: MailDto) {
    try {
      const user = await this.userService.findUserByEmail(mailDto.to);
      if (!user) throw new BadRequestException('Email not exists');
      const payload = { sub: user.id, email: mailDto.to };
      const token = await this.jwtService.signAsync(payload, {
        secret: 'secret',
        expiresIn: '5m',
      });

      const resetLink = `${process.env.BACKEND_HOST}/api/forget-password?token=${token}`;

      return resetLink;
    } catch (error) {
      console.log(error);
    }

    // const mailOptions: Mail.Options = {
    //   from: 'hoang12a3td@gmail.com',
    //   to: mailDto.to,
    //   subject: 'Password Reset Request',
    //   html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    // };

    // try {
    //   const transport = this.mailTransport();
    //   const result = await transport.sendMail(mailOptions);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
