// COMPONENTS
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';

// MODULES
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

export const COMPONENTS = [
    HomeComponent,
    LoginComponent
];

export const MODULES = [
    CommonModule,
    HomeRoutingModule
]