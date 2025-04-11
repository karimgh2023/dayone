import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-file-attachments',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './file-attachments.component.html',
  styleUrls: ['./file-attachments.component.scss']
})
export class FileAttachmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
