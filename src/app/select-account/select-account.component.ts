import { ApisService } from './../services/apis.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {

  constructor(private Router: Router, private Cookie: CookieService, private Api: ApisService) {
    if (this.Cookie.get('FID'))
      this.Router.navigateByUrl('appointments');
    this.Data = [{
      Id: "",
      Name: "",
      ImageUrl: ""
    }];
  }
  Data: {
    Id: any,
    Name: any,
    ImageUrl: any
  }[];
  SelectAccount(ID) {
    console.log(ID);
    this.Cookie.set('FID', ID);
    this.Cookie.set('RID', '1');
    this.Router.navigateByUrl('/appointments');
    window.location.reload();

  }
  ngOnInit() {
    this.Api.GetDoctorFacilites(this.Cookie.get('UID')).subscribe((res: any) => {
      console.log(res);
      this.Data = res;
    });
  }

}
