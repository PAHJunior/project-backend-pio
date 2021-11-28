import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMailDto } from './dto/send-mail.dto';
import { SendMailService } from './send-mail.service';

@ApiTags('send-mail')
@Controller('send-mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  /**
   *
   */
  @Post()
  create(@Body() data: SendMailDto) {
    return this.sendMailService.sendMail(data);
  }
}
