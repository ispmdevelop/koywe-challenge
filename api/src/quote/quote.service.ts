import { Injectable } from '@nestjs/common';
import { QuoteEntity } from './entities/quote.entity';
import { DBService } from 'src/db/db.service';

@Injectable()
export class QuoteService {
  constructor(private readonly dbService: DBService) {}

  create(quote: QuoteEntity) {
    const quoteCreated = this.dbService.quote.create({
      data: quote,
    });
    return quoteCreated;
  }

  findOne(id: string) {
    return this.dbService.quote.findUnique({
      where: { id: id },
    });
  }
}
