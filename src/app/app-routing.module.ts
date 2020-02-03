import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/home/notfound/notfound.component';
import { ManageComponent } from './components/manage/manage.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch: 'full'
  },
  {
    path : 'home',
    loadChildren: () => import('./components/home/home.module')
    .then(m => m.HomeModule)
  },
  {
    path : 'manage',
    component : ManageComponent
  },
  {
    path : '**',
    component : NotfoundComponent
  }
];
// ng generate module articles/articles --module app --flat --routing
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
