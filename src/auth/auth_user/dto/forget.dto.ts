import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
