import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private Cookie: CookieService, private Router: Router) { }
  LogOut() {
    this.Cookie.delete('UID');
    this.Cookie.delete('FID');
    this.Cookie.delete('Name');
    this.Cookie.delete('ImageUrl');
    this.Cookie.delete('Spec');
    this.Router.navigateByUrl('');
  }
  ngOnInit() {
  }

}
