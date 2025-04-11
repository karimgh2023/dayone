import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat03',
  standalone: true,
  imports: [SharedModule,NgbModule,RouterModule],
  templateUrl: './chat03.component.html',
  styleUrls: ['./chat03.component.scss']
})
export class Chat03Component implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }
  open(content:any) {
    this.modalService.open(content)
  }
}
