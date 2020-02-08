import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fireAuth = firebase.auth();
  constructor(private _error: ErrorInterceptor) { }

  getCurrentUser(): Promise<any> {
    return new Promise((res, rej) => {
      firebase.auth().onAuthStateChanged(user => {
        res(user);
      });
    })
  }

  forgotPassword(email : string){
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithPhoneNumber(phone: string, appVerifier: any) {
    return this.fireAuth.signInWithPhoneNumber(phone, appVerifier);
  }

  createUserWithEmailAndPassword(email : string,password : string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password);
  }

  signOut(){
    return this.fireAuth.signOut();
  }
}