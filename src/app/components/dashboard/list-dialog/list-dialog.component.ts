import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/interfaces';
import { WebService } from 'src/app/services/web.service';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent implements OnInit {
  rol = false;
  description: string ='';
  students_list: User[] = [];
  displayedColumns: string[] = ['level', 'first name', 'last name', 'phone', 'rol', 'acciones'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  constructor(
    private http: WebService,
    public matDialog: MatDialog,
    private cookie : CookieService,
    public dialogref: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }



  delete(id: number) {
    //this.loadUsers();
    const dialogref = this.matDialog.open(DetailDialogComponent,
      {
        width: '30%',
        height: '30%',
        data: { id: id, type:'user'  }
      });
      dialogref.afterClosed().subscribe(
        result=>{
          this.loadUsers();
        }
      )

  }
  edit(id: number) {
    this.http.getUser(id).subscribe(
      user =>{
        const dialogref = this.matDialog.open(EditUserComponent,
          {
            width: '70%',
            height: '100%',
            data: { id:id, user:user }
          });
          dialogref.afterClosed().subscribe(
            result=>{
              this.loadUsers();
            }
          )
      }
    ); 
  }

  loadUsers(){
    if (this.data.rol == 'admin')
      this.description = 'Users';
    else
      this.description = 'Students';
    var aux: User[] = [];
    
    this.http.getUsers(this.data.rol,this.data.user).subscribe(
      result => {
        for (let index = 0; index < result.length; index++) {
          if(result[index].username != this.cookie.get('username')){
            aux.push(result[index]);
          }
        } 
        this.students_list = [];
        this.students_list = aux;
        this.dataSource = new MatTableDataSource(this.students_list);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error)
      }
    );
  }

  ngOnInit(): void {
    this.loadUsers();     
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
