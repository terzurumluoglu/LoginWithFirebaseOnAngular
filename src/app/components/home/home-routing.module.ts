import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PhoneComponent } from './phone/phone.component';
import { SocialComponent } from './social/social.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children : [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'phone',
        component : PhoneComponent
      },
      {
        path : 'register',
        component : RegisterComponent
      },
      {
        path : 'socialLogin',
        component : SocialComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
