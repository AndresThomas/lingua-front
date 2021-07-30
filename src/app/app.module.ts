import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { BottombarComponent } from './components/dashboard/bottombar/bottombar.component';
import { ClasschooserComponent } from './components/dashboard/classchooser/classchooser.component';
import { DetailDialogComponent } from './components/dashboard/detail-dialog/detail-dialog.component';
import { EditUserComponent } from './components/dashboard/edit-user/edit-user.component';
import { ListDialogComponent } from './components/dashboard/list-dialog/list-dialog.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { RegisterComponent } from './components/dashboard/register/register.component';
import { TakeclassdialogComponent } from './components/dashboard/takeclassdialog/takeclassdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    BottombarComponent,
    ClasschooserComponent,
    DetailDialogComponent,
    EditUserComponent,
    ListDialogComponent,
    NavbarComponent,
    RegisterComponent,
    TakeclassdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
