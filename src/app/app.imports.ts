import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { NotfoundComponent } from './components/home/notfound/notfound.component';

export const COMPONENTS = [
    LoginComponent,
    HomeComponent,
    ManageComponent,
    NotfoundComponent
];

export const MODULES = [
    BrowserModule,
    AppRoutingModule
];