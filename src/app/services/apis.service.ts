import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../services/config';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient, private Cookie: CookieService) { }
  GetDoctorFacilites(ID) {
    return this.http.get(endpoint('GetDoctorFacilities') + ID);
  }
  GetDoctorAppointments(docid, facid, status, date) {
    return this.http.get(endpoint('GetAppointments') + `doctorId=${docid}&facilityId=${facid}&Date=${date}&statusId=${status}&Lang=en`);
  }
  GetDoctorAppointmentsSlots(docid, facid, status, date) {
    return this.http.get(endpoint('GetAppointmentsSlots') + `doctorId=${docid}&facilityId=${facid}&Date=${date}&statusId=${status}&Lang=en`);
  }
  GetDocAppointment(ID) {
    return this.http.get(endpoint('GetDoctorAppointment') + ID);
  }
  GetDocAppointmentSlots(ID) {
    return this.http.get(endpoint('GetDoctorAppointmentSlots') + ID);
  }
  GetDoctorSchdeule(docid, facid, date) {
    return this.http.get(endpoint('GetSchedule') + `doctorId=${docid}&facilityId=${facid}&Date=${date}&Lang=en`);
  }
  GetDoctorSchdeuleSlots(docid, facid) {
    return this.http.get(endpoint('GetScheduleSlots') + `doctorId=${docid}&facilityId=${facid}`);
  }
  SetDoctorSchdeuleSlots(Data) {
    return this.http.post(endpoint('SetScheduleSlots'), Data);
  }

  GetFacilityInfo(facid) {
    return this.http.get(endpoint('GetFacilityDetails') + `UserId=0&FacilityId=${facid}&SpecialityId=0&Lang=en`);
  }
  UpdateAppointment(Data) {
    return this.http.post(endpoint('UpdateAppiontments'), Data);
  }
  UpdateAppointmentSlots(Data) {
    return this.http.post(endpoint('UpdateAppiontmentsSlots'), Data);
  }

  ForgetPassword(Data) {
    return this.http.post(endpoint('ForgetPassword'), Data);
  }
  ResetPassword(Data) {
    return this.http.post(endpoint('RestePassword'), Data);
  }
  GetSpecs() {
    return this.http.get(endpoint('GetSpecs'));
  }
  GetDocs(ID) {
    return this.http.get(endpoint('GetDoctors') + `SpecialtyId=${ID}&fromDate=${new Date().getMonth() + '-' + new Date().getDate() + '-' + new Date().getFullYear()}&toDate=${new Date().getMonth() + '-' + new Date().getDate() + '-' + new Date().getFullYear()}`);
  }
  GetDocInfo(ID, FID) {

    return this.http.get(endpoint('GetDocInfo') + `DoctorId=${ID}&FacilityId=${FID}&UserId=0&Lang=EN`);
  }
  UpdateDocInfo(Data) {
    return this.http.post(endpoint('UpdateDocInfo'), Data);
  }
  UpdateFacInfo(Data) {
    return this.http.post(endpoint('UpdateFacilityDetails'), Data);
  }
  GetAreas() {
    return this.http.get(endpoint('AllAreas'));
  }
  GetIns() {
    return this.http.get(endpoint('AllInsuranceCompines'));
  }
  AddIns(Data) {
    return this.http.post(endpoint('AddInsuranceCompany'), Data);
  }
  DeleteIns(Data) {
    return this.http.post(endpoint('DeleteInsuranceCompany'), Data);

  }
  UploadImg(Data) {
    return this.http.post(endpoint('UploadImg'), Data);
  }
  UploadImgFac(Data) {
    return this.http.post(endpoint('UpdateFacilityImages'), Data);

  }
  UploadDocImg(Data) {
    return this.http.post(endpoint('UpdateDoctorProfile'), Data);

  }
  AddSpec(Data) {
    return this.http.post(endpoint('AddSpecilityFacility'), Data);

  }



}
