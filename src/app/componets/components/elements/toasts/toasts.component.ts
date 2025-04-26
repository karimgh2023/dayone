import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from './toast.service';
import * as prismcodeData from '../../../shared/prismData/toasts';
@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [SharedModule, NgbModule, ToastrModule,ShowcodeCardComponent],
  providers: [ToastrService],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  prismCode = prismcodeData;
  show = true;
  show1 = true;
  show2 = true;
  show3 = true;
  show4 = true;
  show5 = true;
  show6 = true;
  show7 = true;
  show8 = true;
  show9 = true;
  show10 = true;
  show11 = true;
  show12 = true;
  show13 = true;
  show14 = true;
  show15 = true;
  show16 = true;
  isclose = true;

  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;
  public isCollapsed5 = true;
  public isCollapsed6 = true;
  public isCollapsed7 = true;

   @ViewChild('toastContainer') toastContainer!: ElementRef;

  show0 = false;
  autohide = true;

  constructor(
    public toastService: ToastService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  toasts: { autohide: boolean }[] = [];
  toasts1: { autohide: boolean }[] = [];
  toasts2: { autohide: boolean }[] = [];
  toasts3: { autohide: boolean }[] = [];
  toasts4: { autohide: boolean }[] = [];
  toasts5: { autohide: boolean }[] = [];
  toasts6: { autohide: boolean }[] = [];
  toastsA: { autohide: boolean }[] = [];
  toastsB: { autohide: boolean }[] = [];
  toastsC: { autohide: boolean }[] = [];
  toastsD: { autohide: boolean }[] = [];
  toastsE: { autohide: boolean }[] = [];
  toastsF: { autohide: boolean }[] = [];
  toastsG: { autohide: boolean }[] = [];
  toasts7: { autohide: boolean }[] = [];
  showToast() {
    const newToast = { autohide: true };
    this.toasts.push(newToast);
  }

  //
  showToastprimary() {
    const newToast = { autohide: true };
    this.toasts1.push(newToast);
  }

  showToastseconday() {
    const newToast = { autohide: true };
    this.toasts2.push(newToast);
  }
  
  showToastwarning() {
    const newToast = { autohide: true };
    this.toasts3.push(newToast);
  }

  showToastinfo() {
    const newToast = { autohide: true };
    this.toasts4.push(newToast);
  }

  showToastsuccess() {
    const newToast = { autohide: true };
    this.toasts5.push(newToast);
  }
  showToastdanger() {
    const newToast = { autohide: true };
    this.toasts6.push(newToast);
  }

  hideToastprimary(toast1: { autohide: boolean }) {
    this.toasts1 = this.toasts1.filter((t) => t !== toast1);
  }
  hideToastsecondary(toast: { autohide: boolean }) {
    this.toasts2 = this.toasts2.filter((t) => t !== toast);
  }
  hideToastwarning(toast: { autohide: boolean }) {
    this.toasts3 = this.toasts3.filter((t) => t !== toast);
  }
  hideToastinfo(toast: { autohide: boolean }) {
    this.toasts4 = this.toasts4.filter((t) => t !== toast);
  }
  hideToastsuccess(toast: { autohide: boolean }) {
    this.toasts5 = this.toasts5.filter((t) => t !== toast);
  }
  hideToastdanger(toast: { autohide: boolean }) {
    this.toasts6 = this.toasts6.filter((t) => t !== toast);
  }

  //solid toast
  SolidToastprimary() {
    const newToast = { autohide: true };
    this.toastsA.push(newToast);
  }

  SolidToastsecondary() {
    const newToast = { autohide: true };
    this.toastsB.push(newToast);
  }
  SolidToastwarning() {
    const newToast = { autohide: true };
    this.toastsC.push(newToast);
  }
  SolidToastinfo() {
    const newToast = { autohide: true };
    this.toastsD.push(newToast);
  }
  SolidToastsuccess() {
    const newToast = { autohide: true };
    this.toastsE.push(newToast);
  }
  SolidToastdanger() {
    const newToast = { autohide: true };
    this.toastsF.push(newToast);
  }

  hideToast(toast: { autohide: boolean }) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  hideSolidToastprimary(toastA: { autohide: boolean }) {
    this.toastsA = this.toastsA.filter((t) => t !== toastA);
  }
  hideSolidToastsecondary(toast: { autohide: boolean }) {
    this.toastsB = this.toastsB.filter((t) => t !== toast);
  }
  hideSolidToastwarning(toast: { autohide: boolean }) {
    this.toastsC = this.toastsC.filter((t) => t !== toast);
  }
  hideSolidToastinfo(toast: { autohide: boolean }) {
    this.toastsD = this.toastsD.filter((t) => t !== toast);
  }
  hideSolidToastsuccess(toast: { autohide: boolean }) {
    this.toastsE = this.toastsE.filter((t) => t !== toast);
  }
  hideSolidToastdanger(toast: { autohide: boolean }) {
    this.toastsF = this.toastsF.filter((t) => t !== toast);
  }

  hidden = () => {
    this.show9 = false;
  };

  contentClose() {
    this.show10 = false;
  }

  close() {
    this.isclose = false;
    setTimeout(() => (this.isclose = true), 3000);
  }
  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  showDanger(dangerTpl: any) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  //Top Placements
  TopLeft() {
    const newToast = { autohide: true };
    this.toasts7.push(newToast);
  }
  TopRight() {
    this.toastr.success('Details Successfully Uploaded', 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }
  TopCenter() {
    this.toastr.success(`'Details Successfully Uploaded'`, 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }
  MiddleLeft() {
    this.toastr.success('Details Successfully Uploaded', 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
    });
  }
  MiddleCenter() {
    this.toastr.success('Details Successfully Uploaded', 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-middle-center',
    });
  }
  MiddleRight() {
    this.toastr.success('Details Successfully Uploaded', 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-middle-right',
    });
  }
  BottomLeft() {
    this.toastr.success('Details Successfully Uploaded', 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
    });
  }
  BottomCenter() {
    this.toastr.success('Details Successfully Uploaded', 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
    });
  }
  BottomRight() {
    this.toastr.success('Details Successfully Uploaded', 'ynex', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    });
  }


}
