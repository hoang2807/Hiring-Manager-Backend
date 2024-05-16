import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
// import { Status } from 'src/modules/application/status.enum';
import { Status } from '@prisma/client';

export class UpdateApplicationDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
