export class User {
    public first_name: string;
    public last_name: string;
    public phone_number: string;
    public rol: string;
    public username: string;
    public password: string;
    public email: string;
    public lista: any;

    constructor(fn: string, ln: string, phone: string, rol: string, username: string, password: string, email: string, lista: any) {
        this.first_name = fn;
        this.last_name = ln;
        this.phone_number = phone;
        this.rol = rol;
        this.username = username;
        this.password = password;
        this.email = email;
        this.lista = lista;
    }
}

export class groups{
    public name :string;
    public teacher :string;
    public link_clases :string;
    public lista_alumnos :string;

    constructor(name :string,teacher :string,link_clases :string,lista_alumnos :string){
        this.name= name;
        this.link_clases = link_clases;
        this.teacher = teacher;
        this.lista_alumnos = lista_alumnos;
    }
}

export class Language {
    public language: string;
    public teacher: string;
    public level: string;
    public link: string;
    public usn: string;

    constructor(language: string, teacher: string, level: string, link: string, usn:string) {
        this.language = language;
        this.teacher = teacher;
        this.level = level;
        this.link = link;
        this.usn =usn;
    }
}