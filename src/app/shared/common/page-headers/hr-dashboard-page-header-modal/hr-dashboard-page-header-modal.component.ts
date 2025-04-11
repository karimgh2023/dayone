import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-dashboard-page-header-modal',
  templateUrl: './hr-dashboard-page-header-modal.component.html',
  styleUrls: ['./hr-dashboard-page-header-modal.component.scss']
})
export class HrDashboardPageHeaderModalComponent implements OnInit {
  Time:any;
  constructor() { }

  ngOnInit(): void {
    
    setInterval(()=>{
      this.Time = new Date()
    }, 1000)
  }
  

}
