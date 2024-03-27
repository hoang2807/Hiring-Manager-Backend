import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
// import { AdminService } from 'src/modules/admin/admin.service';

@Injectable()
export class AuthAdminService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}
  async getUser(email: string) {
    const user = await this.databaseService.admin.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid user');

    return user;
  }

  generateToken(user: Admin) {
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async createUser(
    username: string,
    email: string,
    password: string,
    enterpriseId: number,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.databaseService.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
        enterpriseId,
      },
    });

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.databaseService.admin.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid user');

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const { password, ...result } = user;

      return result;
    }

    throw new UnauthorizedException('Invalid user');
  }

  async login(email: string, password: string) {
    const user = await this.databaseService.admin.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new UnauthorizedException('Invalid user');

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      // const payload = {
      //   username: user.username,
      //   sub: user.id,
      // };
      const { password, ...result } = user;

      return {
        result,
        // accessToken: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Invalid user');
  }
}
