import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { groups, User } from 'src/app/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { UpdategroupdialogComponent } from '../updategroupdialog/updategroupdialog.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  displayedColumns: string[] = ['group', 'teacher', 'acciones'];
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
      //group: ['', Validators.required],
      link: ['', Validators.required],
      name: ['', Validators.required],
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
    var aux: groups[] = [];
    this.request.getGroups().subscribe(
      result => { 
        for (let index = 0; index < result.length; index++) {
          aux.push(result[index]);
        }
        this.dataSource = new MatTableDataSource(aux);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(aux)
      },
      error => {
        console.log(error)
      }
    );
    this.form.reset();
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
    /*console.log(this.form)
    console.log(this.toppings.value)
    console.log(this.form.value)*/
    let user:User = this.toppings.value;
    this.request.postGroup(this.form.value.link,this.form.value.name,user,'{data:example}').subscribe(
      response => {
        //console.log(response);
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
    this.request.getGroup(id).subscribe(
      group => {
        const dialogref = this.matDialog.open(UpdategroupdialogComponent,
          {
            width: '20%',
            height: '70%',
            data: { id: id, group }
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
        data: { id: id, type: 'group' }
      });
    dialogref.afterClosed().subscribe(
      result => {
        this.ngOnInit();
      }
    )

  }

}
