import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthAdminService } from 'src/auth/auth_admin/auth_admin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private authAdminService: AuthAdminService) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.authAdminService.validateUser(email, password);

    if (!user) throw new UnauthorizedException('loi gi do');
    return user;
  }
}
