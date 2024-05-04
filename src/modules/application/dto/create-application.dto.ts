import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  jobId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  enterpriseId: number;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;
}
