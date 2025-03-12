import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  PreconditionFailedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { CryptoMktService } from 'src/integrations/crypto-mkt/crypto-mkt.service';
import { RateResponse } from 'src/integrations/crypto-mkt/dto/RateResponse.dto';
import { Quote } from '@prisma/client';
import { QuoteEntity } from './entities/quote.entity';
import { QuoteFormatter } from './utils/QuoteFormatter';

@Controller('quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly cryptoMktService: CryptoMktService,
  ) {}

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    const { from, to, amount } = createQuoteDto;

    let convertionRate: RateResponse;

    try {
      convertionRate = await this.cryptoMktService.getRate(from, to);
    } catch (e) {
      console.error(e);
      throw new NotFoundException(
        `Convertion Rate not found for ${from} to ${to}`,
      );
    }

    const rate = convertionRate[from];

    if (!rate) {
      throw new NotFoundException(
        `Convertion Rate not found for ${from} to ${to}`,
      );
    }

    const convertedAmount = amount * parseFloat(rate.price);

    const fiveMinsInMs = 1000 * 60 * 5;

    const quoteEntity: QuoteEntity = {
      from,
      to,
      amount: amount,
      convertedAmount,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + fiveMinsInMs).toISOString(),
      rate: parseFloat(rate.price),
    };

    let quoteCreated: Quote;

    try {
      quoteCreated = await this.quoteService.create(quoteEntity);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Error creating quote');
    }

    const quoteFormatted = QuoteFormatter.getClientQuoteView(quoteCreated);

    return quoteFormatted;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quote = await this.quoteService.findOne(id);
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }
    const timeInMS = new Date(quote.expiresAt).getTime() - Date.now();
    if (timeInMS < 0) {
      throw new PreconditionFailedException('Quote expired');
    }

    const quoteFormatted = QuoteFormatter.getClientQuoteView(quote);

    return quoteFormatted;
  }
}
