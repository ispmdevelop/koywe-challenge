import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class QuoteService {
  create(createQuoteDto: CreateQuoteDto) {
    return 'This action adds a new quote';
  }

  findOne(id: number) {
    return `This action returns a #${id} quote`;
  }
}
