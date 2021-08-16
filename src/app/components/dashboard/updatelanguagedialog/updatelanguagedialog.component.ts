import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Language } from 'src/app/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-updatelanguagedialog',
  templateUrl: './updatelanguagedialog.component.html',
  styleUrls: ['./updatelanguagedialog.component.css']
})
export class UpdatelanguagedialogComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private request : WebService,
    @Inject(MAT_DIALOG_DATA) public id: any,
    public dialogref: MatDialogRef<UpdatelanguagedialogComponent>,
  ) {
    
    this.form = this.fb.group({
      teacher: [this.id.language.teacher, Validators.required],
      language: [this.id.language.language, Validators.required],
      level:[this.id.language.level, Validators.required],
      link:[this.id.language.link, Validators.required],
      usn:[this.id.language.usn, Validators.required],
    })
    }

  ngOnInit(): void {
  }

  post(){
    var language= new Language(this.form.value.language,this.form.value.teacher,this.form.value.level,this.form.value.link,this.form.value.usn);
    this.request.updateLanguages(this.id.id,language).subscribe(
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
