import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  wallet?: number;

  @IsNumber()
  target: number;

  @IsDateString()
  endDate: Date;
}
