import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-file-manager02',
  standalone: true,
  imports: [SharedModule,NgCircleProgressModule,RouterModule],
  templateUrl: './file-manager02.component.html',
  styleUrls: ['./file-manager02.component.scss']
})
export class FileManager02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
