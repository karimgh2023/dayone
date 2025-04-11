import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password01',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './forget-password01.component.html',
  styleUrls: ['./forget-password01.component.scss']
})
export class ForgetPassword01Component implements OnInit {

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
  toggleClass = "eye-off";
  toggleClass1 = "eye-off";

  createpassword() {
    this.showPassword = !this.showPassword;
    if (this.toggleClass === "eye-off") {
      this.toggleClass = "line";
    } else {
      this.toggleClass = "eye-off";
    }
  }
}
