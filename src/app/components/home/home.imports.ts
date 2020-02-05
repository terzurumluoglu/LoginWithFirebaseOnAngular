// COMPONENTS
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';

// MODULES
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { PhoneComponent } from './phone/phone.component';

export const COMPONENTS = [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PhoneComponent
];

export const MODULES = [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
];