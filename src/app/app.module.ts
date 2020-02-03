import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MODULES, COMPONENTS } from './app.imports';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
