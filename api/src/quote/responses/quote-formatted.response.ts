import { ApiProperty } from '@nestjs/swagger';

export class QuoteFormattedResponse {
  @ApiProperty({
    example: '562914db-e5a9-4bf9-bff3-6a75c0719076',
    description: 'Unique identifier of the quote',
  })
  id: string;

  @ApiProperty({
    example: '100.23',
    description: 'Amount of the from currency',
  })
  amount: string;

  @ApiProperty({
    example: '78077.72637660791224334389',
    description: 'Exchange rate',
  })
  rate: string;

  @ApiProperty({
    example: '723.72637660791224334389',
    description: 'Converted amount',
  })
  convertedAmount: string;

  @ApiProperty({
    example: 'ETH',
    description: 'Key of the currency you would like to change',
  })
  from: string;

  @ApiProperty({
    example: 'VET',
    description: 'Key of the currency you would like to get',
  })
  to: string;

  @ApiProperty({
    example: '2025-03-12T20:44:44.791Z',
    description: 'Date of creation',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-03-12T20:49:44.791Z',
    description: 'Date of expiration',
  })
  expiresAt: string;
}
