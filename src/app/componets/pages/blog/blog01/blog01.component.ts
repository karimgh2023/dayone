import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog01',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './blog01.component.html',
  styleUrls: ['./blog01.component.scss']
})
export class Blog01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
