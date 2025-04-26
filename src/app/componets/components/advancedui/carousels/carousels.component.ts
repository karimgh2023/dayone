
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowcodeCardComponent } from '../../../shared/common/includes/showcode-card/showcode-card.component';
import * as prismCodeData from '../../../shared/prismData/advancedUi/carousel';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-carousels',
  standalone: true,
  imports: [SharedModule,NgbCarouselModule, ShowcodeCardComponent,RouterModule],
  templateUrl: './carousels.component.html',
  styleUrl: './carousels.component.scss'
})
export class CarouselsComponent {
  prismCode = prismCodeData;
 images2=true;
 images=true;
 images3=true;
 images4=true;

 
 images5 = [
  
  {src:'./assets/images/media/29.jpg'},
  {src:'./assets/images/media/31.jpg'},
  {src:'./assets/images/media/36.jpg'},
];
images6 = [
  
  {src:'./assets/images/media/30.jpg'},
  {src:'./assets/images/media/31.jpg'},
  {src:'./assets/images/media/32.jpg'},
];
images7 = [
  
  {src:'./assets/images/media/36.jpg'},
  {src:'./assets/images/media/29.jpg'},
  {src:'./assets/images/media/30.jpg'},
];
images8 = [
  
  {src:'./assets/images/media/13.jpg'},
  {src:'./assets/images/media/14.jpg'},
  {src:'./assets/images/media/18.jpg'},
];
imagesIndicators = [
  './assets/images/media/19.jpg',
  './assets/images/media/18.jpg',
  './assets/images/media/17.jpg',
];
}