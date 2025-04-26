import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import * as prismCodeData from '../../../shared/prismData/advancedUi/accordion'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-accordions',
  standalone: true,
  imports: [SharedModule,CommonModule,NgbModule,ShowcodeCardComponent,RouterModule],
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent {
  panels = ['Accordion Item #1', 'Accordion Item #2', 'Accordion Item #3'];
  prismCode = prismCodeData;
  isCollapsed: any = true;
  isCollapsed1: boolean = true;
  isCollapsed2: boolean = true;
  isCollapsed3: any = true;
  isHorizontalCollapsed: boolean = true;
  constructor() {}

  toggleCollapse(id: string) {
    if (this.isCollapsed[id] === undefined) {
      this.isCollapsed[id] = true;
    } else {
      this.isCollapsed[id] = !this.isCollapsed[id];
    }
  }
  
  toggleHorizontalCollapse() {
    this.isHorizontalCollapsed = !this.isHorizontalCollapsed;
  }

  ngOnInit(): void {}

  public isFirstGradient = false;
  public isSecondGradient = false;

  FirstGradient() {
    this.isFirstGradient = !this.isFirstGradient;
    if (this.isFirstGradient == true) {
      document.querySelector('.firstgradient')?.classList.remove('collapsed');
    } else {
      document.querySelector('.firstgradient')?.classList.add('collapsed');
    }
  }
  SecondGradient() {
    this.isSecondGradient = !this.isSecondGradient;
    if (this.isSecondGradient == true) {
      document.querySelector('.secondgradient')?.classList.remove('collapsed');
    } else {
      document.querySelector('.secondgradient')?.classList.add('collapsed');
    }
  }
}
