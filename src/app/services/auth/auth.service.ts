import { Injectable } from '@angular/core';
import { User, UserList } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  uList: UserList = new UserList();
  constructor(
    private _firebase: FirebaseService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  forgotPassword(email : string){
    return this._firebase.forgotPassword(email);
  }

  login(email, password): Promise<any> {
    return new Promise((res, rej) => {
      this._firebase.signInWithEmailAndPassword(email, password).then(p => {
        if (p) {
          let user: User = new User(p.user.uid, p.user.email,p.user.phoneNumber);
          this.saveUser(user);
          res(user);
        } else {
          rej({});
        }
      }).catch(err => {
        rej(err);
      })
    });
  }

  createUserWithEmailAndPassword(email : string,password : string) : Promise<any>{
    return new Promise((res,rej) => {
      this._firebase.createUserWithEmailAndPassword(email,password).then(p => {
        if (p) {
          let user: User = new User(p.user.uid, p.user.email,p.user.phoneNumber);
          this.saveUser(user);
          res(user);
        } else {
          rej({});
        }
      }).catch(err => {
        rej(err);
      })
    })
  }

  saveUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    return new Promise((res,rej) => {
      this._firebase.signOut().then(() => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        res(true);
      }).catch(err => {
        rej(err);
      });
    });
  }
}
