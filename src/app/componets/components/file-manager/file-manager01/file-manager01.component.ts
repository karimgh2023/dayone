import { NgCircleProgressModule } from 'ng-circle-progress';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-file-manager01',
  standalone: true,
  imports: [SharedModule,NgCircleProgressModule,NgbModule,RouterModule],
  templateUrl: './file-manager01.component.html',
  styleUrls: ['./file-manager01.component.scss']
})
export class FileManager01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
