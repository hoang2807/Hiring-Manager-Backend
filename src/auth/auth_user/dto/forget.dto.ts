import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
