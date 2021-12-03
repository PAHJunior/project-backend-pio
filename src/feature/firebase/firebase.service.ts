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
      apiKey: 'AIzaSyC-xYQFUQj4ovlXEsxVtsyjnGhhf7QZYHk',
      authDomain: 'projectpio.firebaseapp.com',
      projectId: 'projectpio',
      storageBucket: 'projectpio.appspot.com',
      messagingSenderId: '1015721177438',
      appId: '1:1015721177438:web:891068741fdf5eda05dfcf',
    };

    return initializeApp(firebaseConfig);
  }
}
