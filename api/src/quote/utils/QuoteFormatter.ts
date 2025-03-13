import { Quote } from '@prisma/client';
import { QuoteFormattedResponse } from '../responses/quote-formatted.response';

export class QuoteFormatter {
  static getClientQuoteView(quote: Quote): QuoteFormattedResponse {
    const tmp: any = { ...quote };
    tmp.convertedAmount = tmp.convertedAmount.toFixed(20);
    tmp.rate = tmp.rate.toFixed(20);
    return tmp;
  }
}
