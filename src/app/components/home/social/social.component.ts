import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  constructor(private _auth : AuthService) { }

  ngOnInit() {
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

}
