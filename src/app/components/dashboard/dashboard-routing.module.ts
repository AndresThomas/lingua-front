import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RegisterComponent } from '../dashboard/register/register.component';
import { LanguagesComponent } from './languages/languages.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  {path:'register',component:RegisterComponent},
  {path:'language',component:LanguagesComponent},
  {path:'groups',component:GroupsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
