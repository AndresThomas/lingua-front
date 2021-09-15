import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { groups, User } from 'src/app/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-updategroupdialog',
  templateUrl: './updategroupdialog.component.html',
  styleUrls: ['./updategroupdialog.component.css']
})
export class UpdategroupdialogComponent implements OnInit {

  form: FormGroup;
  toppings = new FormControl();
  toppingList: User[] = [];
  toppings2 = new FormControl();
  toppingList2: User[] = [];
  selectedFood =  this.id.group[0].teacher.first_name+" "+this.id.group[0].teacher.last_name;
  selectedFood2 =  this.id.group[0].lista_alumnos;
 

  constructor(private fb: FormBuilder,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    private request : WebService,
    @Inject(MAT_DIALOG_DATA) public id: any,
    public dialogref: MatDialogRef<UpdategroupdialogComponent>,
  ) {
    console.log(this.id.group[0], 'print group')
    this.form = this.fb.group({
      link: [this.id.group[0].link_clases, Validators.required],
      name: [this.id.group[0].name, Validators.required],      
    })
    this.request.getUsers(this.cookie.get('rol'), this.cookie.get('user')).subscribe(
      list => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].rol == 'teacher' || list[i].rol == 'Teacher')
            this.toppingList.push(list[i]);
          if(list[i].rol == 'student' || list[i].rol == 'Student')
            this.toppingList2.push(list[i]);
        }
      });
      this.toppings.setValue(this.id.group[0].teacher);
      this.toppings2.setValue(this.id.group[0].lista_alumnos);
      
    }
    
  
  ngOnInit(): void {
    
    
  }

  post(){
    var group= new groups(this.form.value.name,this.toppings.value,this.form.value.link,this.toppings2.value);
    console.log(group)
    console.log(this.form.value)
    
    this.request.putGroup(this.id.id,group).subscribe(
      response => {
        this._snackBar.open('This item was updated successfully', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.dialogref.close();
      },
      error => {
        this._snackBar.open('This item wasnt updated', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    )
  }


}
