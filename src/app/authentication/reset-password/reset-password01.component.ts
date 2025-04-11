import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password01',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './reset-password01.component.html',
  styleUrls: ['./reset-password01.component.scss']
})
export class ResetPassword01Component implements OnInit {

  constructor(private elementRef:ElementRef) { 
    document.body.classList.add('error-1');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    const htmlElement =
  this.elementRef.nativeElement.ownerDocument.documentElement;
    document.body.classList.remove('error-1');    
  }
  showPassword = false;
  showPassword1 = false;
  showPassword2 = false;
  toggleClass = "eye-off";
  toggleClass1 = "eye-off";
  toggleClass2 = "eye-off";

  createpassword() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === "eye-off") {
      this.toggleClass = "eye";
    } else {
      this.toggleClass = "eye-off";
    }
  }
  createpassword1() {
    this.showPassword1 = !this.showPassword1;
    if (this.toggleClass1 === "eye-off") {
      this.toggleClass1 = "eye";
    } else {
      this.toggleClass1 = "eye-off";
    }
  }
  createpassword2() {
    this.showPassword2 = !this.showPassword2;
    if (this.toggleClass2 === "eye-off") {
      this.toggleClass2 = "eye";
    } else {
      this.toggleClass2 = "eye-off";
    }
  }
}
