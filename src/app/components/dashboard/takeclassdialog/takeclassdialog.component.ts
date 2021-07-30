import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';
import { ClasschooserComponent } from '../classchooser/classchooser.component';

@Component({
  selector: 'app-takeclassdialog',
  templateUrl: './takeclassdialog.component.html',
  styleUrls: ['./takeclassdialog.component.css']
})
export class TakeclassdialogComponent implements OnInit {

  displayedColumns: string[] = ['level', 'full name', 'acciones'];
  dataSource !: MatTableDataSource<any>;
  groups !: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: WebService,
    private cookie: CookieService,
    private _snackBar: MatSnackBar,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    var aux: User[] = [];
    this.http.getUsers(this.data.rol, this.data.user).subscribe(
      result => {
        console.log(this.cookie.get('username'), this.data.rol, result)
        for (let index = 0; index < result.length; index++) {
          if (result[index].username != this.cookie.get('username') && result[index].rol.toLowerCase() != this.cookie.get('rol')) {
            var arr = Object.keys(result[index].lista.languages).map(key => ({ language: key, value: result[index].lista.languages[key] }));
            console.log(result)
            console.log(result[index].lista.languages);
            console.log(arr);
            arr.forEach(
              value => {
                if (value.value.indexOf(',') > -1) {
                  if (value.value.split(',')[0] == this.data.user) {
                    aux.push(result[index]);
                  }
                }
                else{
                  aux.push(result[index]);
                }
              }
            )
          }
        }
        /*
        realizar un filtrado para mostrar al profesor si y solo si
        el esta en la lista del alumno        
        */
       console.log(aux,'************')
        this.dataSource = new MatTableDataSource(aux);
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error)
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  acept(id: any) {
    console.log(id.lista.links)
    var arr = Object.keys(id.lista.links).map(key => ({ link: key, value: id.lista.links[key] }));
    if (arr.length > 1) {
      const dialogref = this.matDialog.open(
        ClasschooserComponent,
        {
          width: '30%',
          height: '50%',
          data: {

          }
        }

      )
    }
    if (arr.length == 1) {
      window.open(arr[0].value, "_blank");
    } else {
      this._snackBar.open('This student isnt registered a class', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }

    /*
    mini ventanita con un chooser para elegir la clase,
    bloquear las clases que el profesor y el alumno no tengan registradas
    */
  }

}
