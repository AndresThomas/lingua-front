import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebService } from 'src/app/services/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import {Animal } from '../../../interfaces/Animal';
import { User } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  animalControl !: FormControl;
  selectFormControl !: FormControl;

  

  animals: Animal[] = [
    {name: 'Student'},
    {name: 'Teacher'},
  ];
  form!: FormGroup;
  is_admin: boolean;
  hide = true;
  user !:User;
  assignament !: string;
  arr !: any[];
  constructor(
    private fb: FormBuilder,
    private request: WebService,
    private _snackBar: MatSnackBar,
    private cookie: CookieService,
    public matDialog: MatDialog,
    public dialogref: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
  ) { 
    this.user = this.id.user;
    try{
      this.arr = Object.keys(this.id.user.lista.languages).map(key => ({ language: key, value: this.id.user.lista.languages[key] }));
    console.log(this.arr)
    
    
    }catch{
      console.log('somethings wrong')
    }
    if(this.arr != undefined){
      this.form = this.fb.group({
        username: [this.user.username, Validators.required],
        password: [this.user.password, Validators.required],
        email: [this.user.email,Validators.compose([Validators.email,Validators.required])],
        firstName: [this.user.first_name, Validators.required],
        lastName: [this.user.last_name, Validators.required],
        phonenumber:[this.user.phone_number,Validators.compose(
          [Validators.maxLength(10),Validators.minLength(10),Validators.required,])],
        animalControl: ['', Validators.required],
        form:[this.user.lista.form, Validators.required],
        level: [this.user.lista.levels, Validators.required],
        languages: [this.arr[0] , Validators.required],
        people:[this.user.lista.people, Validators.required],
        groups :[this.user.lista.groups, Validators.required]
      })
    }else{
      this.form = this.fb.group({
        username: [this.user.username, Validators.required],
        password: [this.user.password, Validators.required],
        email: [this.user.email,Validators.compose([Validators.email,Validators.required])],
        firstName: [this.user.first_name, Validators.required],
        lastName: [this.user.last_name, Validators.required],
        phonenumber:[this.user.phone_number,Validators.compose(
          [Validators.maxLength(10),Validators.minLength(10),Validators.required,])],
        animalControl: ['', Validators.required],
        form:[this.user.lista.form, Validators.required],
        level: [this.user.lista.levels, Validators.required],
        languages: ['' ],
        people:[this.user.lista.people, Validators.required],
        groups :[this.user.lista.groups, Validators.required]
      })
    }
    this.is_admin = this.cookie.get('rol') == 'admin';

    console.log(this.id.user)


    if ( this.id.user.rol == 'Teacher'){
      this.assignament = 'Students';
    }
    if ( this.id.user.rol == 'Student'){
      this.assignament = 'Teachers';
    }
  }
  
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  
  save(data:any){
    let user = {
      first_name: data.firstName,
      last_name:data.lastName,
      phone_number:data.phonenumber,
      rol:data.animalControl.name,
      username: data.username,
      password:data.password,
      email: data.email,
      lista: {
        'languages':data.languages,
        'levels':data.level,
        'people':data.people,
        'groups':data.groups,
        'form': data.form
      }
    }
    this.request.updateUser(user,this.id.id).subscribe(
      result =>{
        this.message('The user was modified successfully');
        this.dialogref.close();
      },error=>{
        this.message('The user wasnt modified successfully');
      }
    )
    
  }

  message(message:string){
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  ngOnInit(): void {  
    //this.last_name_control =  new FormControl(this.user.last_name, Validators.required);
  }

}

