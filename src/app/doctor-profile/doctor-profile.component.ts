import { ToastrService } from 'ngx-toastr';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApisService } from './../services/apis.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  public Editor = ClassicEditor;
  Day: any;
  Data: {
    Name: any,
    Gender: any,
    Nationality: any[],
    Title: any,
    rating: any,
    Speciality: any,
    Language: any[],
    Email: any,
    ContactNumber: any,
    ClinicInfo: any,
    Info: any,
    ImageUrl: any
  };

  Schedule: {
    Date: any,
    NoOfAppointments: any
  }[] = [];
  SlotsData: {
    SlotId: any,
    DoctorId: any,
    FacilityId: any,
    DayId: any,
    Duration: any,
    Time: any
  };

  SlotsDataDetails: {
    SlotId: any,
    DoctorId: any,
    FacilityId: any,
    DayId: any,
    Duration: any,
    Time: any

  };

  ScheduleSlots: {
    Day0: {
      SlotId: any,
      DoctorId: any,
      FacilityId: any,
      DayId: any,
      Duration: any,
      Time: any,
      IsDeleted: any
    }[],
    Day1: {
      SlotId: any,
      DoctorId: any,
      FacilityId: any,
      DayId: any,
      Duration: any,
      Time: any,
      IsDeleted: any

    }[],
    Day2: {
      SlotId: any,
      DoctorId: any,
      FacilityId: any,
      DayId: any,
      Duration: any,
      Time: any,
      IsDeleted: any

    }[],
    Day3: {
      SlotId: any,
      DoctorId: any,
      FacilityId: any,
      DayId: any,
      Duration: any,
      Time: any,
      IsDeleted: any

    }[],
    Day4: {
      SlotId: any,
      DoctorId: any,
      FacilityId: any,
      DayId: any,
      Duration: any,
      Time: any,
      IsDeleted: any

    }[],
    Day5: {
      SlotId: any,
      DoctorId: any,
      FacilityId: any,
      DayId: any,
      Duration: any,
      Time: any,
      IsDeleted: any

    }[],
    Day6: {
      SlotId: any,
      DoctorId: any,
      FacilityId: any,
      DayId: any,
      Duration: any,
      Time: any,
      IsDeleted: any

    }[]

  } = {

      Day0: [{
        SlotId: '',
        DoctorId: '',
        FacilityId: '',
        DayId: '',
        Duration: '',
        Time: '',
        IsDeleted: ''
      }],
      Day1: [{
        SlotId: '',
        DoctorId: '',
        FacilityId: '',
        DayId: '',
        Duration: '',
        Time: '',
        IsDeleted: ''
      }],
      Day2: [{
        SlotId: '',
        DoctorId: '',
        FacilityId: '',
        DayId: '',
        Duration: '',
        Time: '',
        IsDeleted: ''
      }],
      Day3: [{
        SlotId: '',
        DoctorId: '',
        FacilityId: '',
        DayId: '',
        Duration: '',
        Time: '',
        IsDeleted: ''
      }],
      Day4: [{
        SlotId: '',
        DoctorId: '',
        FacilityId: '',
        DayId: '',
        Duration: '',
        Time: '',
        IsDeleted: ''
      }],
      Day5: [{
        SlotId: '',
        DoctorId: '',
        FacilityId: '',
        DayId: '',
        Duration: '',
        Time: '',
        IsDeleted: ''
      }],
      Day6: [{
        SlotId: '',
        DoctorId: '',
        FacilityId: '',
        DayId: '',
        Duration: '',
        Time: '',
        IsDeleted: ''
      }]
    };


  formData: {
    DoctorId: any
    DoctorInfo: any,
    FacilityId: any
    ClinicInfo: any
  };
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalContent2') modalContent2: TemplateRef<any>;

  constructor(private api: ApisService, private Cookie: CookieService, private toast: ToastrService, private modal: NgbModal) {
    this.Data = {
      Name: '',
      Gender: '',
      Nationality: [],
      Title: '',
      rating: '',
      Speciality: '',
      Language: [],
      Email: '',
      ContactNumber: '',
      ClinicInfo: '',
      Info: '',
      ImageUrl: ''
    };
    this.formData = {
      DoctorInfo: '',
      FacilityId: '',
      DoctorId: '',
      ClinicInfo: ''
    };
    this.SlotsData = {
      DayId: '',
      DoctorId: '',
      FacilityId: '',
      Duration: '',
      Time: '',
      SlotId: ''
    };
    this.SlotsDataDetails = {
      DayId: '',
      DoctorId: '',
      FacilityId: '',
      Duration: '',
      Time: '',
      SlotId: ''
    };


  }
  Type = this.Cookie.get('DocType');
  UpdateInfo() {
    this.formData.DoctorId = this.Cookie.get('UID');
    this.formData.FacilityId = this.Cookie.get('FID');
    this.api.UpdateDocInfo(this.formData).subscribe((res: any) => {
      window.location.reload();
    });
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    let input = new FormData();
    input.append('Image', file);
    this.api.UploadImg(input).subscribe((res: any) => {
      this.Cookie.set('ImageUrl', res);
      this.api.UploadDocImg({ DoctorId: this.Cookie.get('UID'), Image: res }).subscribe((res: any) => {
        this.toast.success('Uploaded Successfully');
        window.location.reload();

      });

    });

  }
  AddSlot(DayID) {
    this.SlotsData.DayId = DayID;
    this.SlotsData.DoctorId = this.Cookie.get('UID');
    this.SlotsData.FacilityId = this.Cookie.get('FID');
    this.SlotsData.SlotId = 0;
    let f = [];
    for (let i = 0; i < this.ScheduleSlots.Day0.length; i++) {
      f.push(this.ScheduleSlots.Day0[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day1.length; i++) {
      f.push(this.ScheduleSlots.Day1[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day2.length; i++) {
      f.push(this.ScheduleSlots.Day2[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day3.length; i++) {
      f.push(this.ScheduleSlots.Day3[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day4.length; i++) {
      f.push(this.ScheduleSlots.Day4[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day5.length; i++) {
      f.push(this.ScheduleSlots.Day5[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day6.length; i++) {
      f.push(this.ScheduleSlots.Day6[i]);
    }

    f.push(this.SlotsData);

    this.api.SetDoctorSchdeuleSlots(f).subscribe((res: any) => {
      console.log(res);
      this.modal.dismissAll();
      this.toast.success('Slot Added Successfully');
      this.ngOnInit();
    });

  }
  GetSlotDetails(Id) {
    for (let i = 0; i < this.ScheduleSlots.Day0.length; i++) {
      if (Id == this.ScheduleSlots.Day0[i].SlotId) {
        this.SlotsDataDetails = this.ScheduleSlots.Day0[i];

      }

    }
    for (let i = 0; i < this.ScheduleSlots.Day1.length; i++) {
      if (Id == this.ScheduleSlots.Day1[i].SlotId) {
        this.SlotsDataDetails = this.ScheduleSlots.Day1[i];

      }

    }
    for (let i = 0; i < this.ScheduleSlots.Day2.length; i++) {
      if (Id == this.ScheduleSlots.Day2[i].SlotId) {
        this.SlotsDataDetails = this.ScheduleSlots.Day2[i];

      }
    }
    for (let i = 0; i < this.ScheduleSlots.Day3.length; i++) {
      if (Id == this.ScheduleSlots.Day3[i].SlotId) {
        this.SlotsDataDetails = this.ScheduleSlots.Day3[i];

      }
    }
    for (let i = 0; i < this.ScheduleSlots.Day4.length; i++) {
      if (Id == this.ScheduleSlots.Day4[i].SlotId) {
        this.SlotsDataDetails = this.ScheduleSlots.Day4[i];

      }
    }
    for (let i = 0; i < this.ScheduleSlots.Day5.length; i++) {
      if (Id == this.ScheduleSlots.Day5[i].SlotId) {
        this.SlotsDataDetails = this.ScheduleSlots.Day5[i];

      }
    }
    for (let i = 0; i < this.ScheduleSlots.Day6.length; i++) {
      if (Id == this.ScheduleSlots.Day6[i].SlotId) {
        this.SlotsDataDetails = this.ScheduleSlots.Day6[i];

      }
    }
    this.modal.open(this.modalContent2, { size: 'lg' });




  }
  UpdateSlot() {
    let f = [];
    for (let i = 0; i < this.ScheduleSlots.Day0.length; i++) {
      f.push(this.ScheduleSlots.Day0[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day1.length; i++) {
      f.push(this.ScheduleSlots.Day1[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day2.length; i++) {
      f.push(this.ScheduleSlots.Day2[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day3.length; i++) {
      f.push(this.ScheduleSlots.Day3[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day4.length; i++) {
      f.push(this.ScheduleSlots.Day4[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day5.length; i++) {
      f.push(this.ScheduleSlots.Day5[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day6.length; i++) {
      f.push(this.ScheduleSlots.Day6[i]);
    }
    for (let i = 0; i < f.length; i++) {
      if (f[i].SlotId == this.SlotsDataDetails.SlotId) {
        f[i] = this.SlotsDataDetails;
      }
    }

    this.api.SetDoctorSchdeuleSlots(f).subscribe((res: any) => {
      console.log(res);
      this.modal.dismissAll();
      this.toast.success('Slot Updated Successfully');
      this.ngOnInit();
    });


  }
  DeleteSlot(SlotID) {
    let f = [];
    for (let i = 0; i < this.ScheduleSlots.Day0.length; i++) {
      f.push(this.ScheduleSlots.Day0[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day1.length; i++) {
      f.push(this.ScheduleSlots.Day1[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day2.length; i++) {
      f.push(this.ScheduleSlots.Day2[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day3.length; i++) {
      f.push(this.ScheduleSlots.Day3[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day4.length; i++) {
      f.push(this.ScheduleSlots.Day4[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day5.length; i++) {
      f.push(this.ScheduleSlots.Day5[i]);
    }
    for (let i = 0; i < this.ScheduleSlots.Day6.length; i++) {
      f.push(this.ScheduleSlots.Day6[i]);
    }
    for (let i = 0; i < f.length; i++) {
      if (f[i].SlotId == SlotID) {
        f[i].IsDeleted = 1;
      }
    }
    this.api.SetDoctorSchdeuleSlots(f).subscribe((res: any) => {
      console.log(res);
      this.toast.success('Slot Deleted Successfully');

      this.ngOnInit();
    });


  }
  OpenAddSlot() {
    this.modal.open(this.modalContent, { size: 'lg' });

  }

  ngOnInit() {
    this.api.GetDocInfo(this.Cookie.get('UID'), this.Cookie.get('FID')).subscribe((res: any) => {
      this.Data = res;
      console.log(this.Data);
      this.formData.DoctorInfo = this.Data.Info;
      this.formData.ClinicInfo = this.Data.ClinicInfo;

    });
    if (this.Type === '1')
      this.api.GetDoctorSchdeule(this.Cookie.get('UID'), this.Cookie.get('FID'), (new Date().getMonth() + 1) + '-' + (new Date().getFullYear())).subscribe((res: any) => {

        this.Schedule = res.MonthSchedule;
        console.log(this.Schedule);
      });
    if (this.Type === '3')
      this.api.GetDoctorSchdeuleSlots(this.Cookie.get('UID'), this.Cookie.get('FID')).subscribe((res: any) => {

        this.ScheduleSlots = res.Response;
        console.log(this.ScheduleSlots);
      });

    setTimeout(() => {
      document.getElementById('page-loader').style.display = "none";
    }, 2000);
  }

}
