export class CurrencyPayload {
  currency: string;
  price: string;
  timestamp: string;
}

export class RateResponse {
  [fromCurrency: string]: CurrencyPayload;
}
