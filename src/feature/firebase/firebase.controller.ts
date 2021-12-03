/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthDto } from './dto/firebase-auth.dto';
import { FirebaseService } from './firebase.service';

@ApiTags('firebase')
@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   *
   */
  @Post('authentificate')
  authentificate(@Body() data: FirebaseAuthDto) {
    return this.firebaseService.authentificate(data);
  }

  /**
   *
   */
  @Post('/create-user')
  createUser(@Body() data: FirebaseAuthDto) {
    return this.firebaseService.createUser(data);
  }
}
