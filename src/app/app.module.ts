import { ApisService } from './services/apis.service';
import { AuthGuard } from './services/auth.guard';
import { MaterialModule } from './material';
import { AuthService } from './services/auth.service';

import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavBarComponent } from './page-components/nav-bar/nav-bar.component';
import { AsideBarComponent } from './page-components/aside-bar/aside-bar.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { FacilityProfileComponent } from './facility-profile/facility-profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavBarComponent,
    AsideBarComponent,
    AppointmentsComponent,
    RequestsListComponent,
    SelectAccountComponent,
    DoctorProfileComponent,
    FacilityProfileComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CKEditorModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AppRoutingModule
  ],
  providers: [EmailValidator, AuthService, CookieService, AuthGuard, ApisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
