import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  PreconditionFailedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Quote } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CryptoMktService } from '../integrations/crypto-mkt/crypto-mkt.service';
import { RateResponse } from '../integrations/crypto-mkt/dto/RateResponse.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteEntity } from './entities/quote.entity';
import { QuoteService } from './quote.service';
import { QuoteFormattedResponse } from './responses/quote-formatted.response';
import { QuoteFormatter } from './utils/QuoteFormatter';

export const EXPIRED_TIME_IN_MS = 1000 * 60 * 5;

@ApiTags('Quote')
@UseGuards(JwtAuthGuard)
@Controller('quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly cryptoMktService: CryptoMktService,
  ) {}

  @ApiOperation({
    summary: 'Create a new exchange quote',
    description: 'Get the a exchange rate quote between two currencies',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Quote created',
    type: QuoteFormattedResponse,
  })
  @ApiResponse({ status: 404, description: 'Convertion Rate not found' })
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

    const quoteEntity: QuoteEntity = {
      from,
      to,
      amount: amount,
      convertedAmount,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + EXPIRED_TIME_IN_MS).toISOString(),
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

  @ApiOperation({
    summary: 'Query an existing exchange quote',
    description: 'Get the details of an existing exchange rate quote',
  })
  @ApiResponse({
    status: 200,
    description: 'Quote found',
    type: QuoteFormattedResponse,
  })
  @ApiResponse({ status: 404, description: 'Quote not found' })
  @ApiResponse({ status: 412, description: 'Quote expired' })
  @ApiParam({ name: 'id', description: 'Id of the created quote' })
  @ApiBearerAuth()
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
