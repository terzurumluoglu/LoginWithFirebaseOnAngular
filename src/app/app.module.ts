import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MODULES } from './app.imports';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
