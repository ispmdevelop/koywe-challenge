import { Quote } from '@prisma/client';

export class QuoteFormatter {
  static getClientQuoteView(quote: Quote) {
    const tmp: any = { ...quote };
    tmp.convertedAmount = tmp.convertedAmount.toFixed(20);
    tmp.rate = tmp.rate.toFixed(20);
    return tmp;
  }
}
