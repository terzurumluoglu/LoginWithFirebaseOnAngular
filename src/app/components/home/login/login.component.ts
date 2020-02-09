import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msgData = { cssClass: null, message: null };
  loader: boolean = false;
  alert: boolean = false;
  user: User;
  socialArr : any[] = [
    {title : 'Facebook',cssClass : 'circle pointer facebook',icon : 'fab fa-facebook-f',function : () => this.loginWithFacebook()},
    {title : 'Google',cssClass : 'circle pointer google',icon : 'fab fa-google',function : () => this.loginWithGoogle()},
    {title : 'GitHub',cssClass : 'circle pointer github',icon : 'fab fa-github',function : () => this.loginWithGithub()},
  ]
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private _error: ErrorInterceptor
  ) {
    this.getCurrentUser();
    this.user ? router.navigate(['manage']) : this.createLoginForm();
  }

  ngOnInit() {
    console.log(this.socialArr);
  }

  go() {
    this.router.navigate(['/home/phone']);
  }

  getCurrentUser() {
    this.user = this._auth.currentUserValue;
  }

  loginWithFacebook(){
    this._auth.facebook().then(p => {

    }).catch(err => {
      console.log(err);
    })
  }

  loginWithGoogle(){
    this._auth.google().then(p => {
      console.log(p);
    }).catch(err => {
      console.log(err);
    })
  }

  loginWithGithub(){
    this._auth.github().then(p => {
      console.log(p);
    }).catch(err => {
      console.log(err);
    })
  }

  login(form: FormGroup) {
    this.loader = true;
    this.alert = false;
    this._auth.login(form.value.email, form.value.password).then(u => {
      this.loader = false;
      this.router.navigate(['/manage']);
    }).catch(e => {
      this.loader = false;
      this.alert = true;
      this.msgData = { cssClass: 'alert alert-danger', message: e.message };
      this._error.handleError(e);
    });
  }

  forgotPassword(email: string) {
    this.loader = true;
    this.alert = false;
    this._auth.forgotPassword(email).then(p => {
      this.alert = true;
      this.loader = false;
      this.msgData = { cssClass: 'alert alert-success', message: 'We have sent to you an email for reset your password' };
    }).catch(err => {
      this.alert = true;
      this.loader = false;
      this.msgData = { cssClass: 'alert alert-danger', message: err.message };
      this._error.handleError(err);
    })
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
}
