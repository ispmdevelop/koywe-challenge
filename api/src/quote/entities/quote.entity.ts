export class QuoteEntity {
  id?: string;
  amount: number;
  from: string;
  to: string;
  rate: number;
  convertedAmount: number;
  createdAt?: string;
  expiresAt: string;
}
