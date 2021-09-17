import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private cookie: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validation();
  }

  validation() {
    if (!this.cookie.check('username')) {
      this.router.navigate(["/"]);
    }
  }
  logout() {
    this.cookie.deleteAll('/dashboard');
    this.cookie.deleteAll('/');
  }
  home() {
    this.router.navigate(['dashboard']);
  }

}
