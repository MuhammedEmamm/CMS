import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { SelectAccountComponent } from './select-account/select-account.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { FacilityProfileComponent } from './facility-profile/facility-profile.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'request-list', component: RequestsListComponent, canActivate: [AuthGuard] },
  { path: 'select-account', component: SelectAccountComponent, canActivate: [AuthGuard] },
  { path: 'doctor-profile', component: DoctorProfileComponent, canActivate: [AuthGuard] },
  { path: 'facility-profile', component: FacilityProfileComponent, canActivate: [AuthGuard] },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true , scrollPositionRestoration:'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
