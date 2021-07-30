import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebService } from '../../../services/web.service';
import {Animal } from '../../../interfaces/Animal';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'student'},
    {name: 'teacher'},
    
  ];

  form: FormGroup;
  loading = false;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router :Router,
    private request: WebService

    ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['',Validators.compose([Validators.email,Validators.required])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  home(){
    this.router.navigate(['dashboard']);
  }

  login() {

    const user = {
      first_name:this.form.value.firstName,
      last_name: this.form.value.lastName,
      rol:this.animalControl.value.name,
      username:this.form.value.username,
      password: this.form.value.password,
      email:this.form.value.email,
      phone_number:'0000000000',
      lista:"{language:example}"
    }
    console.log(user,' user')
    this.request.postRegistro(user).subscribe(
      myRequest =>{
        this.message('The user was created successfully');
        this.form.reset();
      },
      error=>{
        this.message('The user wasnt created, ' +error.error.username);
      }
    )
    
    
  }
  message(message:string){
    this._snackBar.open(message,'',{
      duration:5000,
      horizontalPosition:'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['register']);
    }, 1500);
  }


}
