import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, {
  Navigation
} from 'swiper';
import { RouterModule } from '@angular/router';
SwiperCore.use([
  Navigation
]);
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SharedModule,NgbModule,NgSelectModule,SwiperModule,RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  active = 1;
  constructor() { }
  thumbsSwiper:any
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }
  ngOnInit(): void {
  }
  panels = ['Where can I subscribe to your newsletter?', 'Where can in edit my address?', 'What are your opening hours?','Do I have the right to return an item?','General Terms & Conditions (GTC)','Do I need to create an account to make an order?'];  chatPopup(){
    let chat =  document.querySelector('.chat-message-popup');
    if(chat?.classList.contains('active')){
      chat?.classList.remove('active');
    }
    else{
      chat?.classList.add('active');
    }
  }
  
  removeActive(){
    let chat =  document.querySelector('.chat-message-popup');
    chat?.classList.remove('active');
  }
  imageData7=[
    {
      src:"./assets/images/users/15.jpg",
      name:"Json Taylor",
      company:'CEO OF NORJA',
    },
    {
      src:"./assets/images/users/4.jpg",
      name:"Melissa Blue",
      company:'MANAGER CHO',
    },
    {
      src:"./assets/images/users/2.jpg",
      name:"Kiara Advain",
      company:'CEO OF EMPIRO',
    },
    {
      src:"./assets/images/users/10.jpg",
      name:"Jhonson Smith",
      company:'CHIEF SECRETARY MBIO',
    },
    {
      src:"./assets/images/users/12.jpg",
      name:"Dwayne Stort",
      company:'CEO ARMEDILLO',
    },
    {
      src:"./assets/images/users/3.jpg",
      name:"Jasmine Kova",
      company:'AGGENT AMIO',
    },
    {
      src:"./assets/images/users/16.jpg",
      name:"Dolph MR",
      company:'CEO MR BRAND',
    },
    {
      src:"./assets/images/users/5.jpg",
      name:"Brenda Simpson",
      company:'CEO AIBMO',
    },
    {
      src:"./assets/images/users/7.jpg",
      name:"Julia Sams",
      company:'CHIEF SECRETARY BHOL',
    }
  ]
}
