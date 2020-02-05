import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  msgData = {cssClass : null,message : null};
  loader: boolean = false;
  alert : boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private _error: ErrorInterceptor
  ) {
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  register(form: FormGroup) {
    this.loader = true;
    this.alert = false;
    if(form.valid == true){
      if (form.value.password == form.value.passwordConfirm) {
        this._auth.createUserWithEmailAndPassword(form.value.email,form.value.password).then(p => {
          this.loader = false;
          this.router.navigate(['/manage']);
        }).catch(err => {
          this.msgData = {cssClass :'alert alert-danger',message : err.message };
          this._error.handleError(err);
          this.loader = false;
          this.alert = true;
        });
      } else {
        this.msgData = {cssClass :'alert alert-danger',message : 'Passwords are not match' };
        this.loader = false;
        this.alert = true;
        // PASSWORD NOT MATCH
      }
    }
    else{
      this.msgData = {cssClass :'alert alert-danger',message : 'The Form is NOT valid' };
      this.loader = false;
      this.alert = true;
      // INVALID
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    },
    {
       validator: this.passwordMatch // your validation method
    })
  }

  passwordMatch(AC: AbstractControl) {
    if (AC.get('password').value != AC.get('passwordConfirm').value) {
       AC.get('passwordConfirm').setErrors({ MatchPassword: true });
       return true;
    } else {
       return null;
    }
 }
}
