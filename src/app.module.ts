import { SendMailModule } from './feature/send-mail/send-mail.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SendMailModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
