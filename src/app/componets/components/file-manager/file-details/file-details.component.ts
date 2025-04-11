import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, {


  Navigation
 
} from 'swiper';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from "ng-gallery/lightbox";
import { RouterModule } from '@angular/router';
SwiperCore.use([

  Navigation
]);
@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [SharedModule,SwiperModule,GalleryModule,LightboxModule,RouterModule],
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {

  public swiperConfig:any = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints:{
      200:{
           slidesPerView: 1, 
          },
          420:{
            slidesPerView: 2, 
          },
          700:{
            slidesPerView: 3, 
          },
          1400:{
            slidesPerView: 4, 
          }
   }
  } 

  items!: GalleryItem[];

  imageData = data;
  constructor() { }

  ngOnInit(): void {
   
    // Creat gallery items
    this.items = this.imageData.map((item:any) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
  }
  imageData7 = [
    {
      src:"./assets/images/media/17.jpg",
      jpg:"221.jpg",
      kb:"120 KB"
  },
  {
    src:"./assets/images/media/16.jpg",
    jpg:"221.jpg",
    kb:"120 KB"
},
{
  src:"./assets/images/media/18.jpg",
  jpg:"221.jpg",
  kb:"120 KB"
},
{
  src:"./assets/images/media/19.jpg",
  jpg:"221.jpg",
  kb:"120 KB"
},
{
  src:"./assets/images/media/20.jpg",
  jpg:"221.jpg",
  kb:"120 KB"
},
{
  src:"./assets/images/media/21.jpg",
  jpg:"221.jpg",
  kb:"120 KB"
},
{
  src:"./assets/images/media/22.jpg",
  jpg:"221.jpg",
  kb:"120 KB"
},
{
  src:"./assets/images/media/23.jpg",
  jpg:"221.jpg",
  kb:"120 KB"
},
{
  src:"./assets/images/media/24.jpg",
  jpg:"221.jpg",
  kb:"120 KB"
}
]
thumbsSwiper:any
setThumbsSwiper(swiper: any) {
  this.thumbsSwiper = swiper;
}
}

const data = [
  {
    srcUrl: './assets/images/media/29.jpg',
    previewUrl: './assets/images/media/29.jpg'
  },
  {
    srcUrl: './assets/images/media/30.jpg',
    previewUrl: './assets/images/media/30.jpg'
  },
  {
    srcUrl: './assets/images/media/31.jpg',
    previewUrl: './assets/images/media/31.jpg'
  },
  {
    srcUrl: './assets/images/media/32.jpg',
    previewUrl: './assets/images/media/32.jpg'
  },
  {
    srcUrl: './assets/images/media/33.jpg',
    previewUrl: './assets/images/media/33.jpg'
  },
  {
    srcUrl: './assets/images/media/34.jpg',
    previewUrl: './assets/images/media/34.jpg'
  },
  {
    srcUrl: './assets/images/media/36.jpg',
    previewUrl: './assets/images/media/36.jpg'
  },
  {
    srcUrl: './assets/images/media/37.jpg',
    previewUrl: './assets/images/media/37.jpg'
  },
];


