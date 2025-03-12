import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { CryptoMktModule } from 'src/integrations/crypto-mkt/crypto-mkt.module';

@Module({
  imports: [CryptoMktModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
