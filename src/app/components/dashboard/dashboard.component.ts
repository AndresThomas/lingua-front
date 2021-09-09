import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WebService } from 'src/app/services/web.service';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { TakeclassdialogComponent } from './takeclassdialog/takeclassdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url = '';
  message = '';
  is_admin = false;
  is_teacher = false;
  is_student = false;
  constructor(
    private router: Router,
    private http: WebService,
    private cookie: CookieService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  getInClass() {
    const dialogref = this.matDialog.open(
      TakeclassdialogComponent,
      {
        width: '70%',
        height:'90%',
        data: {
          rol: this.cookie.get('rol').toLowerCase(), user: this.cookie.get('username'),
          token: this.cookie.get('csrftoken')
        }
      }

    )
    
  }
  getMyBooks() {
    this.http.getUser(this.cookie.get('id')).subscribe(
      request=>{
        if(request.lista.groups != undefined){
          window.open(request.lista.groups,"_blank");
        }else{
          this._snackBar.open('This person dont have a payment link', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      }
      ,error=>{
        console.log(error)
      }
    )
  }
  getList() {
    const dialogref = this.matDialog.open(ListDialogComponent,
      {
        width: '100%',
        height: '90%',
        data: {
          rol: this.cookie.get('rol').toLowerCase(), user: this.cookie.get('username'),
          token: this.cookie.get('csrftoken')
        }
      }
    )
  }

  

  ngOnInit(): void {
    this.message = this.cookie.get('rol').toLowerCase();

    if (this.message == 'admin') {
      this.is_admin = true;
    }
    if (this.message == 'teacher') {
      this.is_teacher = true;
    }
    if (this.message == 'student') {
      this.is_student = true;
    }
  }

}
