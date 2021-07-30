import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',component:LoginComponent
  },
  {
    path:'dashboard',loadChildren:()=>import ('./components/dashboard/dashboard.module').then(x => x.DashboardModule)
  },
  {
    path:'**',redirectTo:'',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
