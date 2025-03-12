import { Module } from '@nestjs/common';
import { CryptoMktModule } from './crypto-mkt/crypto-mkt.module';

@Module({
  controllers: [],
  providers: [],
  imports: [CryptoMktModule],
})
export class IntegrationsModule {}
