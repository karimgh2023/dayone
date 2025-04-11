import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-support-open-ticket',
  standalone: true,
  imports: [SharedModule,NgSelectModule,RouterModule,SwiperModule],
  templateUrl: './support-open-ticket.component.html',
  styleUrls: ['./support-open-ticket.component.scss']
})
export class SupportOpenTicketComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  thumbsSwiper:any
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }
  imageData7 = [
    {
      text: 'How to Updgrade plan?',
      views:'14',
      likes:'53',
    },
    {
      text: ' How to remove the dollar $ sign?',
      views:'22',
      likes:'02',
    },
    {
      text: 'Is there available in webpack?',
      views:'34',
      likes:'06',
    },
    {
      text: 'How could I manage active menu?',
      views:'19',
      likes:'03',
    },
    {
      text: 'How to Updgrade plan?',
      views:'14',
      likes:'53',
    },
 
  ];
}
