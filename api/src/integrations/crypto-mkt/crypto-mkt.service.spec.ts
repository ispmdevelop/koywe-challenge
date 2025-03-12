import { Test, TestingModule } from '@nestjs/testing';
import { CryptoMktService } from './crypto-mkt.service';

describe('CryptoMktService', () => {
  let service: CryptoMktService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoMktService],
    }).compile();

    service = module.get<CryptoMktService>(CryptoMktService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
