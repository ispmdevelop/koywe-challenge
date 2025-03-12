import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuoteModule } from './quote/quote.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { DBModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './test/test.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DBModule,
    QuoteModule,
    AuthModule,
    UserModule,
    IntegrationsModule,
  ],
  controllers: [AppController, TestController],
})
export class AppModule {}
