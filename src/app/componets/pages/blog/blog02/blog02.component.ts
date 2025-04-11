import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog02',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './blog02.component.html',
  styleUrls: ['./blog02.component.scss']
})
export class Blog02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
