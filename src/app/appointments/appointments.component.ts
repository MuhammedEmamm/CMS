import { ToastrService } from 'ngx-toastr';
import { ApisService } from './../services/apis.service';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
export interface Food {
  value: string;
  viewValue: string;
}
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#18ce0f',
    secondary: '#18ce0f'
  }
};
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})

export class AppointmentsComponent implements OnInit {
  date: Date;

  Data: {
    Id: any,
    PatientName: any,
    PatientNumber: any,
    DoctorName: any,
    Specialty: any,
    DateTime: any,
    Time: any,
    AppointmentStatus: any
  }[] = [];
  Status: any[] = [];
  Specs: {
    Id: any,
    name: any,
    ImageUrl: any
  }[] = [];
  Docs: {
    Id: any,
    Name: any,
    DoctorTypeId: any
  }[] = [];
  SpecID: any;
  DocID: any;
  Date: Date = new Date();
  CDate: Date;
  CTime: any;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;


  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
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

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, private api: ApisService, private Cookie: CookieService, private toast: ToastrService) {
    this.date = new Date();
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
  }
  RoleID: any = this.Cookie.get('RID');

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  GetDocs(ID) {
    this.api.GetDocs(ID).subscribe((res: any) => {
      this.Docs = res.filter(it => it['FacilityId'].toString() === this.Cookie.get('UID').toString());
    });

  }


  Filter() {
    console.log(this.Date);
    if (this.RoleID === '2') {
      console.log(this.DocID);
      if (this.DocID.DoctorTypeId == '1') {
        this.Data = [];
        this.api.GetDoctorAppointments(this.DocID.Id, this.Cookie.get('UID'), '2', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = this.Data.concat(res.appointments);
        });
        this.api.GetDoctorAppointments(this.DocID.Id, this.Cookie.get('UID'), '3', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = this.Data.concat(res.appointments);
        });
        this.api.GetDoctorAppointments(this.DocID.Id, this.Cookie.get('UID'), '4', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          this.Data = this.Data.concat(res.appointments);
          this.Status.length = this.Data.length;
          console.log(this.Data);

        });


      }
      else if (this.DocID.DoctorTypeId == '3') {
        this.Data = [];
        this.api.GetDoctorAppointmentsSlots(this.DocID.Id, this.Cookie.get('UID'), '2', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = this.Data.concat(res.appointments);
        });
        this.api.GetDoctorAppointmentsSlots(this.DocID.Id, this.Cookie.get('UID'), '3', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          console.log(this.Data);
          this.Data = this.Data.concat(res.appointments);
        });
        this.api.GetDoctorAppointmentsSlots(this.DocID.Id, this.Cookie.get('UID'), '4', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          this.Data = this.Data.concat(res.appointments);
          this.Status.length = this.Data.length;
          console.log(this.Data);

        });

      }

    }
    else {
      if (this.Cookie.get('DocType') === '1') {
        this.Data = [];

        this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '2', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
            this.Data.push(res.appointments[i]);

            this.events.push({
              title: `Confirmed Appiontment for ${res.appointments[i].PatientName}`,
              start: startOfDay(new Date(res.appointments[i].DateTime)),
              end: endOfDay(new Date(res.appointments[i].DateTime)),
              color: colors.yellow,
              draggable: false,
            });

          }
          this.refresh.next();
          console.log(res.appointments);

        });
        this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '4', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
            this.Data.push(res.appointments[i]);
            this.events.push({
              title: `Completed Appiontment for ${res.appointments[i].PatientName}`,
              start: startOfDay(new Date(res.appointments[i].DateTime)),
              end: endOfDay(new Date(res.appointments[i].DateTime)),
              color: colors.green,
              draggable: false,
            });
          }
          this.refresh.next();
          console.log(res.appointments);

        });
        this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '3', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
            this.Data.push(res.appointments[i]);
            this.events.push({
              title: `Rejected Appiontment for ${res.appointments[i].PatientName}`,
              start: startOfDay(new Date(res.appointments[i].DateTime)),
              end: endOfDay(new Date(res.appointments[i].DateTime)),
              color: colors.red,
              draggable: false,
            });
          }
          console.log(res.appointments);

          this.Status.length = this.Data.length;
          this.refresh.next();

        });


      }
      else if (this.Cookie.get('DocType') === '3') {
        this.Data = [];

        this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '2', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
            this.Data.push(res.appointments[i]);

            this.events.push({
              title: `Confirmed Appiontment for ${res.appointments[i].PatientName}`,
              start: startOfDay(new Date(res.appointments[i].DateTime)),
              end: endOfDay(new Date(res.appointments[i].DateTime)),
              color: colors.yellow,
              draggable: false,
            });

          }
          this.refresh.next();
          console.log(res.appointments);

        });
        this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '4', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
            this.Data.push(res.appointments[i]);
            this.events.push({
              title: `Completed Appiontment for ${res.appointments[i].PatientName}`,
              start: startOfDay(new Date(res.appointments[i].DateTime)),
              end: endOfDay(new Date(res.appointments[i].DateTime)),
              color: colors.green,
              draggable: false,
            });
          }
          this.refresh.next();
          console.log(res.appointments);

        });
        this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '3', (this.Date.getMonth() + 1) + '-' + this.Date.getDate() + '-' + this.Date.getFullYear()).subscribe((res: any) => {
          for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
            this.Data.push(res.appointments[i]);
            this.events.push({
              title: `Rejected Appiontment for ${res.appointments[i].PatientName}`,
              start: startOfDay(new Date(res.appointments[i].DateTime)),
              end: endOfDay(new Date(res.appointments[i].DateTime)),
              color: colors.red,
              draggable: false,
            });
          }
          console.log(res.appointments);

          this.Status.length = this.Data.length;
          this.refresh.next();

        });

      }

    }

  }

  UpdateStatus(Status, ID, SlotID?: any, date?) {
    if (this.RoleID === '1') {
      if (this.Cookie.get('DocType') == '1') {

        if (Status !== 3)
          this.api.UpdateAppointment({ AppointmentId: ID, StatusId: 4, "DetailedStatusId": Status }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.ngOnInit();
          });
        else
          this.api.UpdateAppointment({ AppointmentId: ID, StatusId: 3 }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.ngOnInit();
          });

      }
      else if (this.Cookie.get('DocType') == '3') {

        if (Status !== 3)
          this.api.UpdateAppointmentSlots({ AppointmentId: ID, StatusId: 4, "DetailedStatusId": Status, SlotId: SlotID, Date: date }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.ngOnInit();
          });
        else
          this.api.UpdateAppointmentSlots({ AppointmentId: ID, StatusId: 3, SlotId: SlotID, Date: date }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.ngOnInit();
          });

      }

    }
    else {
      if (this.DocID.DoctorTypeId == '1') {

        if (Status !== 3)
          this.api.UpdateAppointment({ AppointmentId: ID, StatusId: 4, "DetailedStatusId": Status }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.Filter();
          });
        else
          this.api.UpdateAppointment({ AppointmentId: ID, StatusId: 3 }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.Filter();
          });


      }
      else if (this.DocID.DoctorTypeId == '3') {

        if (Status !== 3)
          this.api.UpdateAppointmentSlots({ AppointmentId: ID, StatusId: 4, "DetailedStatusId": Status, SlotId: SlotID, Date: date }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.Filter();
          });
        else
          this.api.UpdateAppointmentSlots({ AppointmentId: ID, StatusId: 3, SlotId: SlotID, Date: date }).subscribe((res: any) => {
            this.Status = [];
            this.Data = [];
            this.events = [];
            this.toast.success('Status Updated Successfully');
            this.Filter();
          });

      }
    }
  }

  GetAllAppsConfirmed() {
    this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '2', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
      for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
        console.log('s3')
        this.Data.push(res.appointments[i]);

        this.events.push({
          title: `Confirmed Appiontment for ${res.appointments[i].PatientName}`,
          start: startOfDay(new Date(res.appointments[i].DateTime)),
          end: endOfDay(new Date(res.appointments[i].DateTime)),
          color: colors.yellow,
          draggable: false,
        });

      }
      this.refresh.next();
      console.log(res.appointments);

    });

  }
  GetAllAppsCompleted() {
    this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '4', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
      for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
        console.log('s2')

        this.Data.push(res.appointments[i]);
        this.events.push({
          title: `Completed Appiontment for ${res.appointments[i].PatientName}`,
          start: startOfDay(new Date(res.appointments[i].DateTime)),
          end: endOfDay(new Date(res.appointments[i].DateTime)),
          color: colors.green,
          draggable: false,
        });
      }
      this.refresh.next();
      console.log(res.appointments);

    });

  }
  GetAllAppsRejected() {
    this.api.GetDoctorAppointments(this.Cookie.get('UID'), this.Cookie.get('FID'), '3', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
      for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
        console.log('s1')

        this.Data.push(res.appointments[i]);
        this.events.push({
          title: `Rejected Appiontment for ${res.appointments[i].PatientName}`,
          start: startOfDay(new Date(res.appointments[i].DateTime)),
          end: endOfDay(new Date(res.appointments[i].DateTime)),
          color: colors.red,
          draggable: false,
        });
      }
      console.log(res.appointments);

      this.Status.length = this.Data.length;
      this.refresh.next();

    });

  }

  GetAllAppsConfirmedSlots() {
    this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '2', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
      for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
        // console.log('s3')
        this.Data.push(res.appointments[i]);

        this.events.push({
          title: `Confirmed Appiontment for ${res.appointments[i].PatientName}`,
          start: startOfDay(new Date(res.appointments[i].DateTime)),
          end: endOfDay(new Date(res.appointments[i].DateTime)),
          color: colors.yellow,
          draggable: false,
        });

      }
      this.refresh.next();
      console.log(res.appointments);

    });

  }
  GetAllAppsCompletedSlots() {
    this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '4', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
      for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
        // console.log('s2')

        this.Data.push(res.appointments[i]);
        this.events.push({
          title: `Completed Appiontment for ${res.appointments[i].PatientName}`,
          start: startOfDay(new Date(res.appointments[i].DateTime)),
          end: endOfDay(new Date(res.appointments[i].DateTime)),
          color: colors.green,
          draggable: false,
        });
      }
      this.refresh.next();
      console.log(res.appointments);

    });

  }
  GetAllAppsRejectedSlots() {
    this.api.GetDoctorAppointmentsSlots(this.Cookie.get('UID'), this.Cookie.get('FID'), '3', (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' + this.date.getFullYear()).subscribe((res: any) => {
      for (let i = 0; res.appointments != undefined && i < res.appointments.length; i++) {
        // console.log('s1')

        this.Data.push(res.appointments[i]);
        this.events.push({
          title: `Rejected Appiontment for ${res.appointments[i].PatientName}`,
          start: startOfDay(new Date(res.appointments[i].DateTime)),
          end: endOfDay(new Date(res.appointments[i].DateTime)),
          color: colors.red,
          draggable: false,
        });
      }
      console.log(res.appointments);

      this.Status.length = this.Data.length;
      this.refresh.next();

    });

  }

  GetApp(ID) {
    if (this.Cookie.get('DocType') == '1') {
      console.log(ID);
      this.api.GetDocAppointment(ID).subscribe((res: any) => {
        console.log(res);
        this.DataDetails = res;
      });
    }
    else if (this.Cookie.get('DocType') == '3') {
      console.log(ID);
      this.api.GetDocAppointmentSlots(ID).subscribe((res: any) => {
        console.log(res);
        this.DataDetails = res;
      });
    }

  }
  ngOnInit() {
    if (this.RoleID === '1') {
      if (this.Cookie.get('DocType') == '1') {
        this.GetAllAppsConfirmed();
        this.GetAllAppsCompleted();
        this.GetAllAppsRejected();

      }
      else if (this.Cookie.get('DocType') == '3') {
        this.GetAllAppsConfirmedSlots();
        this.GetAllAppsCompletedSlots();
        this.GetAllAppsRejectedSlots();
      }

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
