import { Module } from '@nestjs/common';
import { CryptoMktService } from './crypto-mkt.service';

@Module({
  controllers: [],
  providers: [CryptoMktService],
})
export class CryptoMktModule {}
