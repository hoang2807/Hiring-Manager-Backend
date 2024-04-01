import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEnterpriseDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  about_me: string;
}
