import { Test, TestingModule } from '@nestjs/testing';
import { DBModule } from '../db/db.module';
import { DBService } from '../db/db.service';
import { CryptoMktModule } from '../integrations/crypto-mkt/crypto-mkt.module';
import { EXPIRED_TIME_IN_MS, QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { CryptoMktService } from '../integrations/crypto-mkt/crypto-mkt.service';
import { QuoteFormatter } from './utils/QuoteFormatter';
import { Quote } from '@prisma/client';
import exp from 'node:constants';

const getModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [CryptoMktModule, DBModule],
    controllers: [QuoteController],
    providers: [QuoteService],
  }).compile();
  return module;
};

const validPayload = {
  from: 'CLP',
  to: 'VET',
  amount: 100,
};
const cryptoMarketMockResponse = {
  CLP: {
    currency: 'VET',
    price: '0.04413044427093914',
    timestamp: '2025-03-12T17:34:50.828Z',
  },
};

const quote = {
  id: '562914db-e5a9-4bf9-bff3-6a75c0719076',
  amount: '1',
  from: 'ETH',
  to: 'VET',
  rate: 78077.72637660791224334389,
  convertedAmount: 78077.72637660791224334389,
};

describe('Quotecontroller', () => {
  let quoteService: QuoteService;
  let cryptoMktService: CryptoMktService;
  let dbService: DBService;
  let quoteController: QuoteController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await getModule();

    quoteService = module.get<QuoteService>(QuoteService);
    cryptoMktService = module.get<CryptoMktService>(CryptoMktService);
    quoteController = module.get<QuoteController>(QuoteController);
    dbService = module.get<DBService>(DBService);
  });

  describe('When Requesting the creation of a Quote', () => {
    describe('Crypto Market fails or throws and exception', () => {
      beforeEach(() => {
        jest
          .spyOn(cryptoMktService, 'getRate')
          .mockRejectedValue(new Error('General Error'));
      });
      it('should return an error', async () => {
        expect(quoteController.create(validPayload)).rejects.toThrow();
      });
    });
    describe('Crypto Market integration returns a response', () => {
      beforeEach(() => {
        jest
          .spyOn(cryptoMktService, 'getRate')
          .mockResolvedValue(cryptoMarketMockResponse);
        jest
          .spyOn(quoteService, 'create')
          .mockImplementation((data) => data as any);
      });

      it('should create return a quote with right calculations', async () => {
        const res = await quoteController.create(validPayload);
        const expectedValueConvertedAmount =
          validPayload.amount *
          parseFloat(cryptoMarketMockResponse[validPayload.from].price);
        const expecteValudClientFormatted =
          expectedValueConvertedAmount.toFixed(20);
        expect(res.convertedAmount).toBe(expecteValudClientFormatted);
        const createdTimeIsoString = res.createdAt;
        const createdTimeNow = new Date(createdTimeIsoString).getTime();
        const expectedExpiresAt = new Date(
          createdTimeNow + EXPIRED_TIME_IN_MS,
        ).toISOString();
        expect(res.expiresAt).toBe(expectedExpiresAt);
      });
    });
  });
  describe('When retrieving a quote with Id', () => {
    describe('Quote id exists', () => {
      describe('Has expired', () => {
        beforeEach(() => {
          jest.spyOn(quoteService, 'findOne').mockImplementation(
            () =>
              ({
                ...quote,
                createdAt: new Date().toISOString(),
                expiresAt: new Date(
                  Date.now() - EXPIRED_TIME_IN_MS,
                ).toISOString(),
              }) as any,
          );
        });
        it('should return a quote expired error', () => {
          expect(quoteController.findOne(quote.id)).rejects.toThrow(
            'Quote expired',
          );
        });
      });
      describe('Has not expired', () => {
        const validQuote = {
          ...quote,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + EXPIRED_TIME_IN_MS).toISOString(),
        };
        beforeEach(() => {
          jest
            .spyOn(quoteService, 'findOne')
            .mockImplementation(() => validQuote as any);
        });

        it('should return a quote', async () => {
          const res = await quoteController.findOne(quote.id);
          const expectedResponse = QuoteFormatter.getClientQuoteView(
            validQuote as any,
          );

          expect(res).toMatchObject(expectedResponse);
        });
      });
    });
    describe('Quote id does not exists', () => {
      beforeEach(() => {
        jest.spyOn(quoteService, 'findOne').mockImplementation(() => null);
      });

      it('should return a not found error', async () => {
        expect(quoteController.findOne(quote.id)).rejects.toThrow(
          'Quote not found',
        );
      });
    });
  });
});
