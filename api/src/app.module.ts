import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [QuoteModule, AuthModule, UserModule, IntegrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
