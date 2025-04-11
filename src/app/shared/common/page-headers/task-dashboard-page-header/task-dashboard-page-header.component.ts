import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-dashboard-page-header',
  templateUrl: './task-dashboard-page-header.component.html',
  styleUrls: ['./task-dashboard-page-header.component.scss']
})
export class TaskDashboardPageHeaderComponent implements OnInit {

  @Input() title!: string;
  
  @Input() title2!: string;
  @Input() title3!: string;

  constructor(public dialog: MatDialog,private modalService:NgbModal) {}
  open(content: any) {
    this.modalService.open(content,{size:'lg' });
  }


  ngOnInit(): void {
  }

}
