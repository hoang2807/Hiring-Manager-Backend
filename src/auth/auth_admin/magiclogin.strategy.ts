import { AuthAdminService } from 'src/auth/auth_admin/auth_admin.service';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';

@Injectable()
export class MagicAdminLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicAdminLoginStrategy.name);
  constructor(private authAdminService: AuthAdminService) {
    super({
      secret: 'your-secret',
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: `${process.env.BACKEND_HOST}/api/auth-admin/login/callback`,
      sendMagicLink: async (destination, href) => {
        this.logger.debug(`sending email to ${destination} with link ${href}`);
      },
      verify: async (payload, callback) =>
        callback(null, await this.getUser(payload)),
    });
  }

  async getUser(payload: { destination: string }) {
    const user = await this.authAdminService.getUser(payload.destination);
    return user;
  }
}
