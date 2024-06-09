import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async forget_password(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });

      return payload;
    } catch (error) {
      console.log(error);
    }
  }
}
