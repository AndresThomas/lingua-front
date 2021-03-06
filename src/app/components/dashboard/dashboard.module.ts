import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { RegisterComponent } from '../dashboard/register/register.component';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TakeclassdialogComponent } from './takeclassdialog/takeclassdialog.component';
import { ClasschooserComponent } from './classchooser/classchooser.component';
import { LanguagesComponent } from './languages/languages.component';
import { UpdatelanguagedialogComponent } from './updatelanguagedialog/updatelanguagedialog.component';
import { GroupsComponent } from './groups/groups.component';
import { UpdategroupdialogComponent } from './updategroupdialog/updategroupdialog.component';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent,RegisterComponent,
     BottombarComponent, ListDialogComponent, DetailDialogComponent, EditUserComponent, TakeclassdialogComponent, ClasschooserComponent, LanguagesComponent, UpdatelanguagedialogComponent, GroupsComponent, UpdategroupdialogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
