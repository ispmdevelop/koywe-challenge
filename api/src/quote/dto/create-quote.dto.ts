import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty({ example: 100.34, description: 'Amount of the from currency' })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'ETH',
    description: 'Key of the currency you would like to change',
  })
  @IsString()
  from: string;

  @ApiProperty({
    example: 'VET',
    description: 'Key of the currency you would like to get',
  })
  @IsString()
  to: string;
}
