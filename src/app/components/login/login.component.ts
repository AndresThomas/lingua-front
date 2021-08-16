import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  hide = true;
  rol: any;
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private request: WebService,
    private cookie : CookieService

  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.redirect();
  }

  redirect(){
    if(this.cookie.check('username')){
      //this.fakeLoading();
    }
  }


  login() {
    const username = this.form.value.user;
    const password = this.form.value.password;
    
    this.request.postLogin({ username, password }).subscribe(
      response => {
        this.rol = response;
        this.request.receiveRol(this.rol.rol);
        this.cookie.set('rol',this.rol.rol+'');
        this.cookie.set('id',this.rol.user_id);
        this.cookie.set('username',username);
        localStorage.setItem("username",username);
        this.fakeLoading();
      },
      error => {
        this.error();
        this.form.reset();
      }
    )

  }

  error() {
    this._snackBar.open('Invalid user and password', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }

}
