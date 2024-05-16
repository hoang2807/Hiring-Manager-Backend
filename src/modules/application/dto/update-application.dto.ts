import { IsNotEmpty, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateApplicationDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
