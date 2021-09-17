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
    //console.log(this.data)
    if(this.data.type == 'user'){
      //console.log('delete user')
      this.http.deleteUser(this.data.id).subscribe(
        result=>{
          this.message('The user was deleted successfully');
          this.dialogref.close();
        },error=>{
          this.message('The user wasnt deleted successfully');
          //console.log(error)
        }
      );
    }if(this.data.type == 'language'){
      //console.log('delete language')
      this.http.deleteLanguage(this.data.id).subscribe(
        result=>{
          this.message('The language was deleted successfully');
          this.dialogref.close();
        },error=>{
          this.message('The user wasnt deleted successfully');
          //console.log(error)
        }
      );
    }if(this.data.type == 'group'){
      //console.log('delete group')
      this.http.deleteGroup(this.data.id).subscribe(
        result=>{
          this.message('The group was deleted successfully');
          this.dialogref.close();
        },error=>{
          this.message('The user wasnt deleted successfully');
          //console.log(error)
        }
      );
    }

  }
  message(message:string){
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
