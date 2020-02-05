import { FirebaseService } from '../services/firebase/firebase.service';

export class User {
    id: string;
    email: string;
    phoneNumber : string
    constructor(id: string, email : string,phoneNumber : string) {
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}

export class UserList {
    private _firebase: FirebaseService;
    public getUser(email: string, password: string): Promise<User> {
        return new Promise((res, rej) => {
            this._firebase.signInWithEmailAndPassword(email, password).then(p => {
                console.log(p);
                if(p){
                    let user : User = new User(p.user.uid,p.user.email,p.user.phoneNumber)
                    res(user);
                }else{
                    rej({});
                }
            }).catch(err => {
                rej(err);
            })
        });
    }
}