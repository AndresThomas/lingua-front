import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { groups, Language, User } from 'src/app/interfaces/interfaces';
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
    var error: string = "";
    this.http.getUsers(this.data.rol, this.data.user).subscribe(
      result => {
        //console.log(this.cookie.get('username'), this.data.rol, result)
        for (let index = 0; index < result.length; index++) {
          //dentro del result puede venir el propio usuario que solicita la informacion
          //esta parte es un filtro manual
          if (result[index].username != this.cookie.get('username') && result[index].rol.toLowerCase() != this.cookie.get('rol') && result[index].lista != '{language:example}') {
            let arr = [];
            let lista: User[] = [];
            try {
              arr = Object.entries(result[index].lista.people)//parece ser un array
              for (let ind = 0; ind < arr.length; ind++) {
                lista.push(<User>arr[ind][1]);
                
              }
              //console.log(result[index].lista);
              for (let ind = 0; ind < lista.length; ind++) {
                if (lista[ind].username == this.cookie.get('username')) {
                  aux.push(result[index]);
                }
                if (this.cookie.get('rol').toLowerCase() == 'admin')
                  aux.push(result[index]);
              }

            }
            catch {
              //console.log('hubo un error');
              error += result[index].first_name + " " + result[index].last_name + ",";
            }
          }
          if(result[index].lista != '{language:example}'){
            error += result[index].first_name + " " + result[index].last_name + ",";
          }
          
        }
        //console.log(aux);
        this.dataSource = new MatTableDataSource(aux);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        if (error.length > 0 && this.cookie.get('rol') == 'admin') {
          this._snackBar.open('This users have a problem with their info class: ' + error + 'please configure thats user profiles', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      },
      error => {
        //console.log(error)
      });
    this.http.getGroups().subscribe(
      result =>{
        let lista:groups[]=[];
        for (let index = 0; index < result.length; index++) {
          if(this.cookie.get('rol')== 'admin'){
            lista = result;
            console.log(result[index]);
            index = result.length;
            
          }else{
            console.log(result[index]);
          }
        }
        this.groups = new MatTableDataSource(lista);
        this.groups.sort = this.sort;
        this.groups.paginator = this.paginator;
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

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  acept(user: User) {

    let lang: Language[] = [];
    let arr = [];
    let id = this.cookie.get('id');
    var y: number = +id;
    this.http.getUser(y).subscribe(
      async response => {
        try {
          arr = Object.entries(response.lista.classes);//parece ser un array
          for (let ind = 0; ind < arr.length; ind++) {
            let language: Language = <Language>arr[ind][1];

            if (language.teacher == user.first_name + " " + user.last_name && this.cookie.get('rol') == 'student')
              lang.push(language);
            else
              lang.push(language);
          }
          if (lang.length > 1) {
            const dialogref = this.matDialog.open(
              ClasschooserComponent,
              {
                width: '35%',
                height: '50%',
                data: lang
              }
            )
          }
          if (lang.length == 1) {
            window.open(response.lista.form, "_blank");
            let lang2: Language = <Language>response.lista.classes[0];
            await this.delay(1000);
            //console.log(response.lista.classes[0].link);
            //console.log(lang2)

            window.open(lang2.link, "_blank");

          } else {
            //console.log(lang)
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
        } catch {
          this._snackBar.open("this student isn't registered in a class yet", '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }

      }
    )
  }

  acept2(group:groups){
    console.log(group);
    if(group.link_clases.includes('https://')){
      window.open(group.link_clases,'_blank');
    }else{
      this._snackBar.open("this group don't have any link", '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

}
