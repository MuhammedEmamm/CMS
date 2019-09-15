import { ToastrService } from 'ngx-toastr';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApisService } from './../services/apis.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { style } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-facility-profile',
  templateUrl: './facility-profile.component.html',
  styleUrls: ['./facility-profile.component.css']
})
export class FacilityProfileComponent implements OnInit {
  public Editor = ClassicEditor;

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


  Data: {
    Id: any,
    Name: any,
    Address: any,
    InsuranceCompanies: any[],
    FacilitySpecialities: any[],
    Title: any,
    Rating: any,
    WebSite: any,
    Area: any,
    Email: any,
    AreaId: any,
    ContactNumber: any,
    GeneralInfo: any,
    Services: any,
    ImageUrl: any,
    Images: any[],
    FacilityType: any
  };
  InsComps: {
    Id: any,
    Name: any,
    ImageUrl: any
  }[] = [];
  InsID: any;
  SpecID: any;

  Specs: {
    Id: any,
    name: any,
    ImageUrl: any
  }[] = [];
  Specs1: {
    Id: any,
    name: any,
    ImageUrl: any
  }[] = [];
  Docs: {
    Id: any,
    Name: any,
    DoctorTypeId: any
  }[] = [];
  SpecID1: any;
  DocID: any = {};
  Day: any;
  TypeID: any;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalContent2') modalContent2: TemplateRef<any>;

  constructor(private api: ApisService, private Cookie: CookieService, private toast: ToastrService, private modal: NgbModal) {
    this.Data = {
      Id: '',
      Name: '',
      Address: '',
      InsuranceCompanies: [],
      FacilitySpecialities: [],
      Title: '',
      Rating: '',
      WebSite: '',
      Area: '',
      AreaId: '',
      Email: '',
      ContactNumber: '',
      GeneralInfo: '',
      Services: '',
      ImageUrl: '',
      Images: [],
      FacilityType: ''
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
  UpdateInfo() {
    this.api.UpdateFacInfo(this.Data).subscribe((res: any) => {
      this.toast.success('Updated Successfully');
      this.api.GetFacilityInfo(this.Cookie.get('UID')).subscribe((res: any) => {
        this.Data = res;
        this.Cookie.set('ImageUrl', this.Data.ImageUrl);
        this.api.GetAreas().subscribe((res: any[]) => {
          if (res.filter(it => it['name'].toString() === this.Data.Area.toString()))
            this.Data.AreaId = res.filter(it => it['name'].toString() === this.Data.Area.toString())[0].Id;
        });
        this.api.GetIns().subscribe((res: any[]) => {
          this.InsComps = res;
          for (let i = 0; this.Data.InsuranceCompanies !== undefined && i < this.Data.InsuranceCompanies.length; i++) {
            if (res.filter(it => it['Name'].toString() === this.Data.InsuranceCompanies[i].Name.toString()))
              this.Data.InsuranceCompanies[i].Id = res.filter(it => it['Name'].toString() === this.Data.InsuranceCompanies[i].Name.toString())[0].Id;
            console.log(this.Data);
          }
        });
      });
      window.location.reload();
    });
  }
  DeleteInsComp(ID) {
    this.api.DeleteIns({ InsuranceCompanyId: ID, FacilityId: this.Cookie.get('UID') }).subscribe((res: any) => {
      this.ngOnInit();
      this.toast.success('Deleted successfully');
    });
  }
  AddInsComp(ID) {
    console.log(ID);
    this.api.AddIns({ InsuranceCompanyId: ID, FacilityId: this.Cookie.get('UID') }).subscribe((res: any) => {
      this.ngOnInit();
      this.toast.success('Added successfully');
    });
  }
  ngOnInit() {
    this.api.GetFacilityInfo(this.Cookie.get('UID')).subscribe((res: any) => {
      this.Data = res;
      if (this.Data.ImageUrl)
        this.Data.ImageUrl = this.Data.ImageUrl.substring(47, this.Data.ImageUrl.length);
      console.log(this.Data);
      this.Cookie.set('ImageUrl', this.Data.ImageUrl);
      this.Specs1 = this.Data.FacilitySpecialities;
      this.api.GetAreas().subscribe((res: any[]) => {
        if (res.filter(it => it['name'].toString() === this.Data.Area.toString()))
          this.Data.AreaId = res.filter(it => it['name'].toString() === this.Data.Area.toString())[0].Id;
      });
      this.api.GetIns().subscribe((res: any[]) => {
        this.InsComps = res;
        for (let i = 0; this.Data.InsuranceCompanies !== undefined && i < this.Data.InsuranceCompanies.length; i++) {
          if (res.filter(it => it['Name'].toString() === this.Data.InsuranceCompanies[i].Name.toString()))
            this.Data.InsuranceCompanies[i].Id = res.filter(it => it['Name'].toString() === this.Data.InsuranceCompanies[i].Name.toString())[0].Id;
          console.log(this.Data);
        }
      });
      this.AllSpec();

    });
    if (document.getElementById('page-loader').style.display !== "none")
      setTimeout(() => {
        document.getElementById('page-loader').style.display = "none";
      }, 2000);
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    let input = new FormData();
    input.append('Image', file);
    this.api.UploadImg(input).subscribe((res: any) => {
      console.log(res);
      this.Data.ImageUrl = res;
      this.UpdateInfo();

    });

  }
  
  onFilesChanged(event) {
    document.getElementById('page-loader').style.display = "block";

    const files = event.target.files;
    let imgs = [];
    for (let i = 0; this.Data.Images != undefined && i < this.Data.Images.length; i++) {
      imgs.push(this.Data.Images[i].substring(47, this.Data.Images[i].length))
    }
    for (let i = 0; files != undefined && i < files.length; i++) {
      let input = new FormData();
      input.append('Image', files[i]);
      this.api.UploadImg(input).subscribe((res: any) => {
        imgs.push(res);
        this.api.UploadImgFac({ FacilityId: this.Cookie.get('UID'), Images: imgs }).subscribe((res: any) => {
          console.log(res);
          this.toast.success('Updated Successfully');
          if (i === files.length - 1) {
            this.ngOnInit();
          }

        });


      });
    };

  }
  DeleteImage(index) {
    this.Data.Images.splice(index, 1);
    console.log(this.Data.Images);
    let imgs = [];
    for (let i = 0; this.Data.Images != undefined && i < this.Data.Images.length; i++) {
      imgs.push(this.Data.Images[i].substring(47, this.Data.Images[i].length))
    }
    console.log(imgs);
    this.api.UploadImgFac({ FacilityId: this.Cookie.get('UID'), Images: imgs }).subscribe((res: any) => {
      console.log(res);
      this.toast.success('Updated Successfully');
      this.ngOnInit();
    });


  }
  AllSpec() {
    this.Specs = [];
    this.api.GetSpecs().subscribe((res: any[]) => {
      // this.Specs = res;
      for (let s of res) {
        let flag = false;

        for (let fs of this.Data.FacilitySpecialities) {
          if (s.Id === fs.Id) {
            flag = true;
            break;
          }
        }
        if (!flag)
          this.Specs.push(s);
      }
      // this.Specs = this.Specs.filter(it => this.Data.FacilitySpecialities.filter(ia => ia['Id'] != it['Id']).length == this.Data.FacilitySpecialities.length);
      console.log(this.Specs);
    });
  }
  AddSpec(ID) {
    this.api.AddSpec({ SpecialitityID: ID, FacilityId: this.Cookie.get('UID') }).subscribe((res: any) => {
      this.toast.success('Added successfully');
      window.location.reload();
    });
  }
  GetDocs(ID) {
    this.api.GetDocs(ID).subscribe((res: any) => {
      this.Docs = res.filter(it => it['FacilityId'].toString() === this.Cookie.get('UID').toString());
    });

  }
  GetSch() {
    this.TypeID = this.DocID.DoctorTypeId;
    if (this.DocID.DoctorTypeId == '1')
      this.api.GetDoctorSchdeule(this.DocID.Id, this.Cookie.get('UID'), (new Date().getMonth() + 1) + '-' + (new Date().getFullYear())).subscribe((res: any) => {

        this.Schedule = res.MonthSchedule;
        console.log(this.Schedule);
      });
    if (this.DocID.DoctorTypeId == '3')
      this.api.GetDoctorSchdeuleSlots(this.DocID.Id, this.Cookie.get('UID')).subscribe((res: any) => {

        this.ScheduleSlots = res.Response;
        console.log(this.ScheduleSlots);
      });

  }
  AddSlot(DayID) {
    this.SlotsData.DayId = DayID;
    this.SlotsData.DoctorId = this.DocID.Id;
    this.SlotsData.FacilityId = this.Cookie.get('UID');
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
      this.GetSch();

      this.modal.dismissAll();
      this.toast.success('Slot Added Successfully');

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
      this.GetSch();

      this.modal.dismissAll();
      this.toast.success('Slot Updated Successfully');
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

      this.GetSch();
    });


  }
  OpenAddSlot() {
    this.modal.open(this.modalContent, { size: 'lg' });

  }



}
