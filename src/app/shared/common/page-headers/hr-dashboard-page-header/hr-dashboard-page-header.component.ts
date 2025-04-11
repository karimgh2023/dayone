import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HrDashboardPageHeaderModalComponent } from '../hr-dashboard-page-header-modal/hr-dashboard-page-header-modal.component';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import flatpickr from 'flatpickr';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-hr-dashboard-page-header',
  templateUrl: './hr-dashboard-page-header.component.html',
  styleUrls: ['./hr-dashboard-page-header.component.scss']
})
export class HrDashboardPageHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() title1!: string;
  @Input() title2: string | undefined;
  @Input() title3!: string;
  @Input() class!: string;
  @Input() class1!: string;
  @Input() path!: string;
  @Input() path1!: string;

  model!: NgbDateStruct;
  currentPath: string = '';
  // private routerSubscription: Subscription;
content: any;
  constructor(public dialog: MatDialog,private router: Router) {
    this.currentPath = router.url
    // this.routerSubscription = this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // )
    // .subscribe((event:any) => {
    //   this.currentPath = event.urlAfterRedirects; // Use event.urlAfterRedirects
    // });
  }


  
  inlineDatePicker: boolean = false;
  weekNumbers!: true
  // selectedDate: Date | null = null; 
  flatpickrOptions: any = {
    inline: true,
   
  };
  // flatpickrOptions: FlatpickrOptions;

  ngOnInit() {
    this.flatpickrOptions = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
    };

    flatpickr('#inlinetime', this.flatpickrOptions);

      this.flatpickrOptions = {
        enableTime: true,
        dateFormat: 'Y-m-d H:i', // Specify the format you want
        defaultDate: '2023-11-07 14:30', // Set the default/preloaded time (adjust this to your desired time)
      };

      flatpickr('#pretime', this.flatpickrOptions);
  }

  private modalService = inject(NgbModal);
    openModal(content: TemplateRef<any>) {
      this.modalService.open(content, { centered: true,size:'lg' });
    }
}
