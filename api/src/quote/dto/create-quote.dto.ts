import { IsNumber, IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  amount: number;

  @IsString()
  from: string;

  @IsString()
  to: string;
}
