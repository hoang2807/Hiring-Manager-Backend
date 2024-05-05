import { IsNotEmpty, IsString } from 'class-validator';

export class DownloadCvDto {
  @IsNotEmpty()
  @IsString()
  path: string;
}
