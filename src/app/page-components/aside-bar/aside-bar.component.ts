import { Router } from '@angular/router';
import { ApisService } from './../../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.css']
})
export class AsideBarComponent implements OnInit {

  constructor(private Cookie: CookieService, private api: ApisService, public router: Router) {
    this.date = new Date();

    this.Data = {
      Name: this.Cookie.get('Name'),
      Spec: this.Cookie.get('Spec'),
      Ft: this.Cookie.get('FT'),
      ImageUrl: this.Cookie.get('ImageUrl')
    };
  }
  date: Date;

  Data: {
    Name: any,
    Spec: any,
    ImageUrl: any,
    Ft: any
  };
  counter: any = 0;
  RoleID: any = this.Cookie.get('RID');
  ngOnInit() {
    if (this.RoleID === '1')
      this.api.GetDocInfo(this.Cookie.get('UID'), this.Cookie.get('FID')).subscribe((res: any) => {
        this.Data.Name = res.Name;
        this.Data.ImageUrl = res.ImageUrl;
        this.Data.Spec = res.Speciality
        console.log(this.Data);

      });
    if (this.RoleID === '1')
      setInterval(() => {
        if (this.Cookie.get('UID') !== '' && this.Cookie.get('FID') !== '') {


          if (this.Cookie.get('DocType') == '1')
            this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '1', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
              if (res.appointments !== undefined)
                this.counter = res.appointments.length;
            });

          else if (this.Cookie.get('DocType') == '3')
            this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '1', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
              if (res.appointments !== undefined)
                this.counter = res.appointments.length;
            });
        }


      }, 1500)

    if (this.RoleID === '2')
      this.api.GetFacilityInfo(this.Cookie.get('UID')).subscribe((res: any) => {
        this.Data.Name = res.Name;
        this.Data.Ft = res.FacilityType;
        this.Data.ImageUrl = res.ImageUrl;
      });


  }

}
