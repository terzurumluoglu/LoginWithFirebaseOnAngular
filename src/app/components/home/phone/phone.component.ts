import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as firebase from "firebase";
import { WindowService } from "../../../services/window/window.service";
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  phoneForm: FormGroup;
  codeForm: FormGroup;
  windowRef: any;
  msgData = {cssClass : null,message : null};
  loader: boolean = false;
  alert : boolean = false;
  isPhone : boolean = true;
  isCode : boolean = false;
  btnisActive : boolean = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private win: WindowService,
    private _auth: AuthService,
    private _firebase: FirebaseService,
    private _error: ErrorInterceptor
  ) {
    this.createPhoneForm();
    this.createCodeForm();
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
    });
  }

  createCodeForm() {
    this.codeForm = this.fb.group({
      code: []
    })
  }

  login(phoneForm: FormGroup) {
    this.loader = true;
    this.alert = false;
    this.btnisActive = false;
    var appVerifier = this.windowRef.recaptchaVerifier;
    this._firebase.signInWithPhoneNumber(phoneForm.value.phone, appVerifier).then(res => {
      this.windowRef.confirmationResult = res;
      this.loader = false;
      this.alert = true;
      this.isPhone = false;
      this.isCode = true;
      this.msgData = {cssClass : 'alert alert-success',message : 'We have sent Verification Code'};
    }).catch(err => {
      this.loader = false;
      this.msgData = {cssClass : 'alert alert-danger',message : err.message};
      this.alert= true;
      this.btnisActive = true;
      this._error.handleError(err);
    })
  }

  verifyCode(codeForm: FormGroup) {
    this.loader = true;
    this.alert = false;
    let code: string = codeForm.value.code;
    this.windowRef.confirmationResult.confirm(code).then(p => {
      this.loader = false;
      let user: User = new User(p.user.uid, p.user.email, p.user.phoneNumber)
      this._auth.saveUser(user);
      this.router.navigate(['/manage']);
    }).catch(err => {
      this.loader = false;
      this.msgData = {cssClass : 'alert alert-danger',message : err.message};
      this.alert= true;
    });
  }

  createPhoneForm() {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required]]
    })
  }
}
