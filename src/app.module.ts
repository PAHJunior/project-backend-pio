import { FirebaseModule } from './feature/firebase/firebase.module';
import { SendMailModule } from './feature/send-mail/send-mail.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FirebaseModule, SendMailModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
