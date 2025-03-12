import { Injectable } from '@nestjs/common';
import { RateResponse } from './dto/RateResponse.dto';

@Injectable()
export class CryptoMktService {
  serviceHost = 'https://api.exchange.cryptomkt.com/api/3';
  async getRate(
    fromCurrency: string,
    toCurrency: string,
  ): Promise<RateResponse> {
    if (!fromCurrency || !toCurrency) {
      throw new Error('Any of the currencies should be empty');
    }

    const fromValueEncoded = encodeURIComponent(fromCurrency);
    const toValueEncoded = encodeURIComponent(toCurrency);
    const path = `/public/price/rate?from=${fromValueEncoded}&to=${toValueEncoded}`;
    const url = `${this.serviceHost}${path}`;
    const res = await fetch(url).then((res) => res.json());
    return res;
  }
}
