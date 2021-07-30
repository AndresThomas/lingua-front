import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent implements OnInit {
  constructor(
    private http: WebService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public dialogref: MatDialogRef<DetailDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  deleteUser(){
    console.log(this.data)
    this.http.deleteUser(this.data.id).subscribe(
      result=>{
        this.message('The user was modified successfully');
        this.dialogref.close();
      },error=>{
        this.message('The user wasnt modified successfully');
        console.log(error)
      }
    );
  }
  message(message:string){
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
