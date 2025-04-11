import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list01',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './contact-list01.component.html',
  styleUrls: ['./contact-list01.component.scss']
})
export class ContactList01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
