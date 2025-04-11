import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDashboardPageHeaderModalComponent } from '../job-dashboard-page-header-modal/job-dashboard-page-header-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-dashboard-page-header',
  templateUrl: './job-dashboard-page-header.component.html',
  styleUrls: ['./job-dashboard-page-header.component.scss']
})
export class JobDashboardPageHeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() title2!: string;
  @Input() title1!: string;
  constructor(public dialog: MatDialog,private modalService:NgbModal) {}

  openDialog() {
    const dialogRef = this.dialog.open(JobDashboardPageHeaderModalComponent);
    dialogRef.afterClosed().subscribe(result => {});
  }
  open(content: any) {
    this.modalService.open(content,{size:'lg' });
  }
  ngOnInit(): void {
  }

}
