import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, {

  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Mousewheel,
  
} from 'swiper';

SwiperCore.use([

  Scrollbar,
  A11y,
  Virtual,
  Mousewheel,
  Zoom,
  Autoplay,
  Thumbs,

]);
@Component({
  selector: 'app-knowledge-view',
  standalone: true,
  imports: [SharedModule,RouterModule,SwiperModule],
  templateUrl: './knowledge-view.component.html',
  styleUrls: ['./knowledge-view.component.scss']
})
export class KnowledgeViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  thumbsSwiper:any
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }

  imageData7 = [
    {
      title: 'How to Updgrade plan?',
      views:'14',
      likes:'53',
    },
    {
      title: ' How to remove the dollar $sign?',
      views:'22',
      likes:'02',
      
    },
    {
      title: 'Is there available in webpack?',
      views:'34',
      likes:'06', 
    },
    {
      title: 'How could I manage active  menu?',
      views:'19',
      likes:'03', 
    },
    {
      title: 'How to Updgrade plan?',
      views:'14',
      likes:'53',
    },
    {
      title: ' How to remove the dollar $sign?',
      views:'22',
      likes:'02',
      
    },
  ];

}
