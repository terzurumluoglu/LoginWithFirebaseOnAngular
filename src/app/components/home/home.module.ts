import { NgModule } from '@angular/core';
import { MODULES, COMPONENTS } from './home.imports';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [
    COMPONENTS,
    SocialComponent
  ],
  imports: [
    MODULES
  ]
})
export class HomeModule { }
