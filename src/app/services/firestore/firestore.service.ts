import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public userFire: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.userFire = firebaseAuth.authState;
  }

  // Obtener el estado de autenticación
  get authenticated(): boolean {
    return this.userFire != null; // True ó False
  }

  // Obtener el observador del usuario actual
  get currentUser(): Observable<firebase.User | null> {
    return this.userFire;
  }

  public signup(email: string, password: string): any {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  public login(email: string, password: string): any {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  public forgot(email: string): any {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

  public logout() {
    this.firebaseAuth.signOut();
  }
}
