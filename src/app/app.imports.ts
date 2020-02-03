// COMPONENTS
import { ManageComponent } from './components/manage/manage.component';
import { NotfoundComponent } from './components/home/notfound/notfound.component';

// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

export const COMPONENTS = [
    ManageComponent,
    NotfoundComponent
];

export const MODULES = [
    BrowserModule,
    AppRoutingModule
];