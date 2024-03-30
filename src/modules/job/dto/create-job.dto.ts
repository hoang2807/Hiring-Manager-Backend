import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  enterpriseName: string;

  @IsNotEmpty()
  @IsString()
  job_description: string;

  @IsNotEmpty()
  @IsString()
  job_requirements: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  skills: string;

  @IsNotEmpty()
  @IsString()
  salary: string;

  @IsNotEmpty()
  @IsString()
  benefits: string;

  @IsNotEmpty()
  @IsString()
  working_time: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  deadline_date: string;

  @IsNotEmpty()
  @IsNumber()
  enterpriseId: number;
}
