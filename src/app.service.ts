import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async forget_password(email: string, token: string) {
    try {
      const payload = this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });

      console.log(payload);

      return payload;
    } catch (error) {
      console.log(error);
    }
  }
}
