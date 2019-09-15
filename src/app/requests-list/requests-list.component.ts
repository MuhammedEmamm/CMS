import { ToastrService } from 'ngx-toastr';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApisService } from './../services/apis.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {
  date: Date;
  Status: any[];
  Data: {
    Id: any,
    PatientName: any,
    PatientNumber: any,
    DoctorName: any,
    Specialty: any,
    DateTime: any,
    Time: any,
    AppointmentStatus: any
  }[];
  DataDetails: {
    PatientId: any,
    PatientDOB: any,
    Id: any,
    PatientName: any,
    PatientNumber: any,
    DoctorName: any,
    Specialty: any,
    ClinicName: any,
    DateTime: any,
    Time: any,
    AppointmentStatus: any
  };
  Specs: {
    Id: any,
    name: any,
    ImageUrl: any
  }[];
  Docs: {
    Id: any,
    Name: any,
    DoctorTypeId: any
  }[];
  SpecID: any;
  DocID: any;
  Date: Date = new Date();
  RoleID: any = this.Cookie.get('RID');
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  AppID: any;
  CDate: Date;
  CTime: any;
  constructor(private modal: NgbModal, private api: ApisService, private Cookie: CookieService, private toast: ToastrService) {
    this.date = new Date();
    this.Data = [];
    this.DataDetails = {
      PatientId: '',
      PatientDOB: '',
      Id: '',
      PatientName: '',
      PatientNumber: '',
      DoctorName: '',
      Specialty: '',
      ClinicName: '',
      DateTime: '',
      Time: '',
      AppointmentStatus: ''
    };
    this.Specs = [];
    this.Docs = [];
    this.Status = [];
  }

  GetApp(ID) {
    if (this.Cookie.get('DocType') === '1') {
      console.log(ID);
      this.api.GetDocAppointment(ID).subscribe((res: any) => {
        console.log(res);
        this.DataDetails = res;
      });

    }
    else if (this.Cookie.get('DocType') === '3') {
      console.log(ID);
      this.api.GetDocAppointmentSlots(ID).subscribe((res: any) => {
        console.log(res);
        this.DataDetails = res;
      });
    }


  }

  GetDocs(ID) {
    this.api.GetDocs(ID).subscribe((res: any[]) => {
      console.log(ID);
      console.log(res);
      this.Docs = res.filter(it => it['FacilityId'].toString() === this.Cookie.get('UID').toString());
    });
  }

  Filter() {
    if (this.RoleID === '2') {
      if (this.DocID.DoctorTypeId == '1') {
        this.api.GetDoctorAppointments(this.DocID.Id, this.Cookie.get('UID'), '1', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = res.appointments;
        });


      }
      else if (this.DocID.DoctorTypeId == '3') {
        this.api.GetDoctorAppointmentsSlots(this.DocID.Id, this.Cookie.get('UID'), '1', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = res.appointments;
        });

      }


    }
    else {
      if (this.Cookie.get('DocType') == '1') {
        this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '1', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = res.appointments;
        });


      }
      else if (this.Cookie.get('DocType') == '3') {
        this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '1', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = res.appointments;
        });

      }

    }
  }

  UpdateStatus(Status, ID, date?, SlotID?) {
    if (this.RoleID === '1') {

      if (this.Cookie.get('DocType') == '1') {

        if (Status === 2)
          this.ConfirmDateTimeRequest(ID) ; 
        else
          this.api.UpdateAppointment({ AppointmentId: ID, StatusId: Status }).subscribe((res: any) => {
            this.Status = [];
            this.toast.success('Status Updated Successfully');
            this.ngOnInit();
          });

      }
      else if (this.Cookie.get('DocType') == '3') {
        this.api.UpdateAppointmentSlots({ AppointmentId: ID, StatusId: Status, Date: date, SlotId: SlotID }).subscribe((res: any) => {
          this.Status = [];
          this.toast.success('Status Updated Successfully');
          this.ngOnInit();
        });

      }
    }
    else {
      if (this.DocID.DoctorTypeId == '1') {

        if (Status === 2)
          this.ConfirmDateTimeRequest(ID)  ; 
        else
          this.api.UpdateAppointment({ AppointmentId: ID, StatusId: Status }).subscribe((res: any) => {
            this.Status = [];
            this.toast.success('Status Updated Successfully');
            this.Filter();
          });


      }
      else if (this.DocID.DoctorTypeId == '3') {
        this.api.UpdateAppointmentSlots({ AppointmentId: ID, StatusId: Status, Date: date, SlotId: SlotID }).subscribe((res: any) => {
          this.Status = [];
          this.toast.success('Status Updated Successfully');
          this.Filter();
        });

      }
    }

  }
  ConfirmDateTimeRequest(ID) {
    this.modal.open(this.modalContent, { size: 'lg' });
    this.GetApp(ID);
  }
  ConfirmRequest(ID) {
    this.CDate = new Date(this.CDate);
    this.api.UpdateAppointment({ AppointmentId: ID, StatusId: 2, Time: this.CTime, DateTime: (this.CDate.getMonth() + 1) + '-' + this.CDate.getDate() + '-' + this.CDate.getFullYear() }).subscribe((res: any) => {
      this.Status = [];
      this.toast.success('Date And Time Updated Successfully');
      this.modal.dismissAll();
      this.Filter();

    });
  }
  ngOnInit() {
    if (this.RoleID === '1') {
      if (this.Cookie.get('DocType') == '1')
        this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '1', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
          this.Data = res.appointments;
          this.Status.length = this.Data.length;
        });

      else if (this.Cookie.get('DocType') == '3')
        this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '1', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
          this.Data = res.appointments;
          this.Status.length = this.Data.length;
        });


    }

    this.api.GetFacilityInfo(this.Cookie.get('UID')).subscribe((res: any) => {
      if (res)
        this.Specs = res.FacilitySpecialities;
    });
    if (document.getElementById('page-loader'))
      setTimeout(() => {
        document.getElementById('page-loader').style.display = "none";
      }, 2000);
  }

}
