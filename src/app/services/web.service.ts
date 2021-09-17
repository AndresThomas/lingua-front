import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language, User, groups } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})


export class WebService {
  link = 'https://linguazone2.herokuapp.com/';
  //link = 'http://localhost:8000/'
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
  postLanguage(language:string,teacher:string,level:string,/*link:string,*/usn:string){return this.http.post(this.link+'languages/',{language,teacher,level,/*link*/usn});}
  /**********************************************/
    getLink(){return this.link;}
  getBooks(){
    return this.http.get('https://drive.google.com/drive/folders/1Tn6vuO9v2mxejDiqp_zHDn4qbt7TbEc2');
  }
  getList(){
    return this.http.get(this.link);
  }
  getGroups(){return this.http.get<groups[]>(this.link+'groups')}
  getGroup(id:any){return this.http.get<groups>(this.link+'groups/'+id+'/')}
  postGroup(link_clases:string,name:string,teacher:User,lista_alumnos:string){return this.http.post(this.link+'groups/',{link_clases,name,teacher,lista_alumnos})}
  putGroup(id:any,group:groups){return this.http.put(this.link+"groups/get/"+id+"/",group);}
  getUsers(rol:string,user:string) {
    let params = new HttpParams();
    params= params.append("rol",rol);
    params= params.append("user",user);
    return this.http.get<User[]>(this.link+"register",{params:params})
  }
  getLanguages(){return this.http.get<Language[]>(this.link+'languages/')}

  getLanguage(id:any):Observable<Language>{
    return this.http.get<Language>(this.link+"languages/get/"+id+"/");
  }

  getUser(id:any):Observable<User>{
    return this.http.get<User>(this.link+"register/get/"+id+"/");
  }

  updateUser(user:User,id:number){
    return this.http.put(this.link+"register/get/"+id+"/",user);
  }
  updateLanguages(id:number,language:Language){
    return this.http.put(this.link+"languages/get/"+id+"/",language);
  }

  deleteUser(id:number){
    return this.http.delete(this.link+"register/get/"+id+"/");
  }

  deleteLanguage(id:number){
    return this.http.delete(this.link+"languages/get/"+id+"/");
  }

  deleteGroup(id:number){
    return this.http.delete(this.link+"groups/get/"+id+"/");
  }
}
