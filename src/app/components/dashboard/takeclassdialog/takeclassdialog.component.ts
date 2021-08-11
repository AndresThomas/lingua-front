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

  displayedColumns: string[] = ['level', 'full name' ,'acciones'];
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
    var error: string ="";
    this.http.getUsers(this.data.rol, this.data.user).subscribe(
      result => {
        console.log(this.cookie.get('username'), this.data.rol, result)
        for (let index = 0; index < result.length; index++) {
          //dentro del result puede venir el propio usuario que solicita la informacion
          //esta parte es un filtro manual
          if (result[index].username != this.cookie.get('username') && result[index].rol.toLowerCase() != this.cookie.get('rol')) {
            var arr = Object.keys(result[index].lista.languages).map(key => ({ language: key, value: result[index].lista.languages[key] }));
            //console.log(result)
            //console.log(result[index].lista.languages);
            //console.log(arr);
            arr.forEach(
              value => {
                //esta condicion ayuda a que saber si tiene un maestro asignado ademas
                // de ver si el formato de la plataforma es correcto
                // ejemplo -> LANGUAGEJSON:{
                // LANGUAGE:{ NOMBREPROFESOR,GRADO}
                //}
                // ejemplo -> LANGUAGEJSON:{
                // JAPONESE:{ KIMCHIN,2}
                //}
                if (value.value.indexOf(',') > -1) {
                  if (value.value.split(',')[0] == this.data.user) {
                    aux.push(result[index]);
                    console.log(result[index],'  true');
                  }
                }
                else{
                  if(result[index].rol.toLowerCase() == 'student'){
                    error+=result[index].username+',';
                  }
                }
              }
            )
          }
        }
        /*
        realizar un filtrado para mostrar al profesor si y solo si
        el esta en la lista del alumno        
        */
       //console.log(aux,'************')
        this.dataSource = new MatTableDataSource(aux);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        if(error.length >0){
          this._snackBar.open('This students have a problem with their info class: '+error+' please contact with the admin', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      },
      error => {
        console.log(error)
      });
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  acept(id: any) {
    console.log(id.lista)
    console.log(id.lista.links)
    try{
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
      console.log(arr,'**************<>>>>>>>>')
      if (arr.length == 1) {
        window.open(id.lista.form,"_blank");
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
    }catch{
      this._snackBar.open("this student isn't registered in a class yet", '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }


    
  }

}
