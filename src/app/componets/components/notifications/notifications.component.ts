import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxNotifierService } from 'ngx-notifier';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { MaterialModuleModule } from '../../../material-module/material-module.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedModule,MaterialModuleModule,FormsModule,ReactiveFormsModule,NgSelectModule,RouterModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {


  constructor(private toastr: ToastrService,private modalService:NgbModal) {
  
   }

  ngOnInit(): void {
  }
  showDefault() {
    this.toastr.info('This is an example of tip', 'TIP', {
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      
     
    });
  }
  showSuccess() {
    this.toastr.success('This is an example of tip', 'TIP', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    });
  }
  
  showError() {
    this.toastr.error('This is an example of tip', 'TIP', {
      timeOut: 2000,
      positionClass: 'toast-top-right',
    });
  }

  showInfo() {
    this.toastr.info('This is an example of tip', 'TIP', {
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
    });
  }

  ShowWarning() {
    this.toastr.warning('This is an example of tip', 'TIP', {
      timeOut: 1500,
      positionClass: 'toast-top-left',
    });
  }

  Notification() {
    this.toastr.info('This is an example of tip', 'TIP', {
      timeOut: 1500,
      positionClass: 'toast-top-center',
    });
  }
  Info() {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation Required',
      text: 'Are You sure want to reset password',
      confirmButtonColor: '#40871d',
      cancelButtonColor: '#1c76a6',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
    });
  }
  modal:any
  content:any
  showPopup(content:any){
  this.modalService.open(content,{centered:true,size:'sm'})
  }
}
