import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApisService } from './../services/apis.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  formData: {
    Email: any,
    VerfiyCode: any,
    NewPassword: any

  };

  constructor(private Router: Router, private api: ApisService, private modal: NgbModal, private toast: ToastrService) {
    this.formData = {
      Email: '',
      VerfiyCode: '',
      NewPassword: ''
    };
  }
  Success: Boolean;
  Submit() {
    this.api.ForgetPassword({ Email: this.formData.Email }).subscribe((res: any) => {
      console.log(res);
      this.Success = res;
      if (!res)
        this.toast.error("Please Enter Valid Email");
      if (res) {
        this.toast.success('Verification Code sent to your email successfully');

        this.modal.open(this.modalContent, { size: 'lg' });
      }
    });

  }
  ResetPass() {
    this.api.ResetPassword(this.formData).subscribe((res: any) => {
      console.log(res);
      this.Success = res;
      if (res) {
        this.toast.success('Password changed successfully');
        this.modal.dismissAll();
        this.Router.navigateByUrl('/');

      }
      else {
        this.toast.error('Something went wrong');
      }
    });

  }
  ngOnInit() {
  }

}
