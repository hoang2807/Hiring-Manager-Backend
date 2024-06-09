import { ForgetDto } from './dto/forget.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/auth/auth_user/dto/create-user.dto';
import { LoginDto } from 'src/auth/auth_user/dto/login.dto';
import { Token } from 'src/auth/auth_user/type';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<Token> {
    const userExists = await this.databaseService.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    });

    if (userExists) throw new BadRequestException('User already exists');

    const emailExists = await this.databaseService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (emailExists) throw new BadRequestException('Email already exists');

    const hash = await this.hashData(createUserDto.password);

    const newUser = await this.databaseService.user.create({
      data: { ...createUserDto, password: hash },
    });

    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });

    if (!user) throw new BadRequestException('User does not exits');

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { tokens, user };
  }

  async logout(userId: number) {
    return await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async forget(forgetDto: ForgetDto) {
    try {
      const payload = await this.jwtService.verifyAsync(forgetDto.token, {
        secret: 'secret',
      });

      const email = payload.email;
      const user = await this.databaseService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) throw new BadRequestException('User does not exits');

      const hash = await this.hashData(forgetDto.password);

      return await this.databaseService.user.update({
        where: {
          email,
        },
        data: {
          password: hash,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTokens(userId: number, username: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, username },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
