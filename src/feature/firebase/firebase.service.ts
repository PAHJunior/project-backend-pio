/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { FirebaseAuthDto } from './dto/firebase-auth.dto';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { FirebaseApp } from '@firebase/app';
import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class FirebaseService {
  constructor(private logger: Logger) {}

  /**
   * Authentificate user
   */
  async authentificate(body: FirebaseAuthDto): Promise<UserCredential> {
    const { email, password } = body;

    this.logger.log(`Start authentificate to email ${email}`);
    const app = this.initializeFirebase();

    const auth = getAuth(app);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new BadRequestException('Error in authentificate user');
    }
  }

  /**
   * Create a new user
   */
  async createUser(body: FirebaseAuthDto): Promise<UserCredential> {
    const { email, password } = body;

    this.logger.log(`Start authentificate to email ${email}`);
    const app = this.initializeFirebase();

    const auth = getAuth(app);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new BadRequestException('Error in created a new user');
    }
  }

  /**
   * Initialize firebase
   */
  private initializeFirebase(): FirebaseApp {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };

    return initializeApp(firebaseConfig);
  }
}
