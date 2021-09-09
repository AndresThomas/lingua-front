import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Language, User } from 'src/app/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { UpdatelanguagedialogComponent } from '../updatelanguagedialog/updatelanguagedialog.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  displayedColumns: string[] = ['language', 'teacher', 'acciones'];
  dataSource !: MatTableDataSource<any>;
  groups !: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  form: FormGroup;
  toppings = new FormControl();

  toppingList: User[] = [];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private request: WebService,
    public matDialog: MatDialog,
    private cookie: CookieService
  ) {
    this.form = this.fb.group({
      language: ['', Validators.required],
      level: ['', Validators.required],
      //link: ['', Validators.required],
    });
    this.request.getUsers(this.cookie.get('rol'), this.cookie.get('user')).subscribe(
      list => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].rol == 'teacher' || list[i].rol == 'Teacher')
            this.toppingList.push(list[i]);
        }

      }
    );
  }

  ngOnInit(): void {
    var aux: Language[] = [];
    this.request.getLanguages().subscribe(
      result => {
        console.log(result)

        for (let index = 0; index < result.length; index++) {
          aux.push(result[index]);
          console.log(result[index])
        }
        this.dataSource = new MatTableDataSource(aux);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error)
      }
    );
    

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  home() {
    this.router.navigate(['dashboard']);
  }

  post() {
    console.log(this.form)
    console.log(this.toppings.value)
    this.request.postLanguage(this.form.value.language, this.toppings.value.first_name+" "+this.toppings.value.last_name, this.form.value.level, /*this.form.value.link,*/ this.toppings.value.username).subscribe(
      response => {
        console.log(response);
        this._snackBar.open('Saved successfully', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      error => {
        console.log(error);
        this._snackBar.open('Oops something was wrong, please contact to support', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
    this.ngOnInit();
  }

  edit(id: number) {
    this.request.getLanguage(id).subscribe(
      language => {
        const dialogref = this.matDialog.open(UpdatelanguagedialogComponent,
          {
            width: '20%',
            height: '70%',
            data: { id: id, language }
          });
        dialogref.afterClosed().subscribe(
          result => {
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
        data: { id: id, type: 'language' }
      });
    dialogref.afterClosed().subscribe(
      result => {
        this.ngOnInit();
      }
    )

  }
}
