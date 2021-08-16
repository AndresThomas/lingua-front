import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Language } from 'src/app/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { UpdatelanguagedialogComponent } from '../updatelanguagedialog/updatelanguagedialog.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  displayedColumns: string[] = ['language', 'teacher' ,'acciones'];
  dataSource !: MatTableDataSource<any>;
  groups !: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private request : WebService,
    public matDialog: MatDialog,
  ) {
    this.form = this.fb.group({
      teacher: ['', Validators.required],
      language: ['', Validators.required],
      level:['',Validators.required],
      link:['',Validators.required],
      usn:['',Validators.required],
    })
   }

  ngOnInit(): void {
    var aux : Language[]=[];
    this.request.getLanguages().subscribe(
      result=>{
        console.log(result)
        
        for (let index = 0; index < result.length; index++) {
            aux.push(result[index]);
            console.log(result[index])
        } 
        this.dataSource = new MatTableDataSource(aux);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error=>{
        console.log(error)
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  home(){
    this.router.navigate(['dashboard']);
  }

  post(){
    this.request.postLanguage(this.form.value.language,this.form.value.teacher,this.form.value.level,this.form.value.link,this.form.value.usn).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);        
      }
    )
  }

  edit(id: number) {
    this.request.getLanguage(id).subscribe(
      language =>{
        const dialogref = this.matDialog.open(UpdatelanguagedialogComponent,
          {
            width: '20%',
            height: '70%',
            data: { id:id,language}
          });
          dialogref.afterClosed().subscribe(
            result=>{
              this.ngOnInit();
            }
          )
      }
    ); 
  }

  delete(id: number) {
    this.ngOnInit();
    const dialogref = this.matDialog.open(DetailDialogComponent,
      {
        width: '30%',
        height: '30%',
        data: { id: id, type:'language' }
      });
      dialogref.afterClosed().subscribe(
        result=>{
          this.ngOnInit();
        }
      )

  }
}
