import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  Joinusform: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Mobile: ['', Validators.required],
    FirstName: ['', Validators.required] , 
    LastName: ['', Validators.required] , 
    Speciality: ['', Validators.required] , 
    
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private Cookie: CookieService, private auth: AuthService, private Route: Router, private toast: ToastrService, private modal: NgbModal) {
    if (this.Cookie.get('RID'))
      this.Route.navigateByUrl('/select-account');
    this.formData = {
      Email: "",
      Password: ""
    };
  }
  formData: {
    Email: any,
    Password: any
  };
  Admin: Boolean = false;
  Doctor: Boolean = false;
  get f() { return this.Joinusform.controls; }

  Login() {

    this.auth.login(this.formData)
      .subscribe((res: any) => {
        if (res) {
          if (res.NumberOfRaters >= 0) {
            this.Cookie.set('UID', res.Id);
            this.Cookie.set('Name', res.Name);
            this.Cookie.set('ImageUrl', res.ImageUrl);
            this.Cookie.set('Spec', res.Speciality);
            this.Cookie.set('DocType', res.DoctorTypeId);
            this.toast.success("Logged in successfully as doctor");
            this.Route.navigateByUrl('select-account');

          }
          else {
            this.Cookie.set('UID', res.Id);
            this.Cookie.set('RID', '2');
            this.Cookie.set('Name', res.Name);
            this.Cookie.set('ImageUrl', res.ImageUrl);
            this.Cookie.set('FT', res.FacilityType);
            this.toast.success("Logged in successfully as facility");
            this.Route.navigateByUrl('appointments');
            window.location.reload();

          }
          console.log(res);
        }
        else
          this.toast.error("Invalid email or password");

      });

    // if (this.Admin)
    //   this.auth.loginAdmin(this.formData).subscribe((res: any) => {
    //     this.Cookie.set('FID', res.Id);
    //     this.Cookie.set('Name', res.Name);
    //     this.Cookie.set('ImageUrl', res.ImageUrl);
    //     this.Cookie.set('Spec', res.Speciality);
    //     console.log(res);
    //   });
  }
  ngOnInit() {
  }
  OpenJoinUsForm() {
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  ContactUs() {
    this.submitted = true;
    if (this.Joinusform.invalid) {
      return;
    }
    this.auth.JoinUs(this.Joinusform.value).subscribe((res: any) => {
      if (res) {
        this.toast.success('We Will Contact You Shortly');
        this.modal.dismissAll();
        this.Joinusform.reset();
        this.submitted = false;
      }

    });
  }

}
