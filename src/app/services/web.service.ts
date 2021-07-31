import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})


export class WebService {
  link = 'https://lzn.herokuapp.com/';
  books = '';
  classLink='';
  list = '';
  private messageSource= new BehaviorSubject('default');
  currentMessage = this.messageSource.asObservable();
  constructor(
    private http:HttpClient
  ) { }

  /**********************************************/
  postLogin(data: any) { return this.http.post(this.link+'login/', data); }
  postRegistro(data: any) { return this.http.post(this.link + 'register/', data); }
  receiveRol(rol:string){this.messageSource.next(rol)}

  /**********************************************/

  getLink(){
    //return this.http.get(this.link,);
    return this.link;
  }
  getBooks(){
    return this.http.get('https://drive.google.com/drive/folders/1Tn6vuO9v2mxejDiqp_zHDn4qbt7TbEc2');
  }
  getList(){
    return this.http.get(this.link);
  }

  getUsers(rol:string,user:string) {
    let params = new HttpParams();
    params= params.append("rol",rol);
    params= params.append("user",user);
    return this.http.get<User[]>(this.link+"register",{params:params})
  }

  getUser(id:any):Observable<User>{
    return this.http.get<User>(this.link+"register/get/"+id+"/");
  }

  updateUser(user:User,id:number){
    return this.http.put(this.link+"register/get/"+id+"/",user);
  }

  deleteUser(id:number){
    return this.http.delete(this.link+"register/get/"+id+"/");
  }
}
