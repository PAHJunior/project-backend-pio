import { SendMailService } from './send-mail.service';
/*
https://docs.nestjs.com/modules
*/

import { Logger, Module } from '@nestjs/common';
import { SendMailController } from './send-mail.controller';

@Module({
  imports: [],
  controllers: [SendMailController],
  providers: [SendMailService, Logger],
})
export class SendMailModule {}
