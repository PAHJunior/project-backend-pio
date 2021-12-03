import { FirebaseService } from './firebase.service';
/*
https://docs.nestjs.com/modules
*/

import { Logger, Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';

@Module({
  imports: [],
  controllers: [FirebaseController],
  providers: [FirebaseService, Logger],
})
export class FirebaseModule {}
