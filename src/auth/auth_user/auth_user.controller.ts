import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { CreateUserDto } from 'src/auth/auth_user/dto/create-user.dto';
import { Token } from 'src/auth/auth_user/type';
import { LoginDto } from 'src/auth/auth_user/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { GetCurrentUserId } from 'src/common/decorator/get-current-user-id.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { ForgetDto } from 'src/auth/auth_user/dto/forget.dto';

@ApiTags('AuthUser')
@Controller('auth-user')
@UseGuards(AccessTokenGuard)
export class AuthUserController {
  constructor(private readonly authUseService: AuthUserService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<Token> {
    return await this.authUseService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authUseService.signIn(loginDto);
  }

  @Get('logout')
  async logout(@GetCurrentUserId() id: number) {
    return await this.authUseService.logout(id);
  }

  @Public()
  @Post('forget')
  async forget(@Body() forgetDto: ForgetDto) {
    return await this.authUseService.forget(forgetDto);
  }
}
