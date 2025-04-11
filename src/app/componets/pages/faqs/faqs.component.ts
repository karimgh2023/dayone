import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  isCollapsed = true;
  panels = ['1.  How To Insert All The Plugins?', '2.  How Can I contact?', '3.  Can I use this Plugins in Another Template?',
  '4.  How Can I Add another page in Template?','5.  It is Easy to Customizable?',' 6.  How can I download This template?'];

  constructor() { }

  ngOnInit(): void {
  }

}
