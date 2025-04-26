import { Component, ElementRef, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance} from "keen-slider"
import { SharedModule } from '../../../shared/common/sharedmodule';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Mousewheel,
  Keyboard,
  EffectCube,
  EffectFade,
  EffectFlip,
  EffectCoverflow,
  SwiperOptions,
  Swiper,
} from 'swiper';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Mousewheel,
  Zoom,
  Autoplay,
  Thumbs,
  Keyboard,
  EffectCube,
  EffectFade,
  EffectFlip,
  EffectCoverflow,
]);

@Component({
  selector: 'app-swiperjs',
  standalone: true,
  imports: [SharedModule,CommonModule,SwiperModule,RouterModule],
  templateUrl: './swiperjs.component.html',
  styleUrls: ['./swiperjs.component.scss']
})
export class SwiperjsComponent {
  indexNumber = 1;
  thumbsSwiper: any;

  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }

  swiperOptions = {
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    // other options...
  };

  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  opacities: number[] = [];
  slider!: KeenSliderInstance;

  public currentSlide = 1;

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.sliderRef && this.sliderRef.nativeElement) {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
          slides: this.imageData.length,
          loop: true,
          defaultAnimation: {
            duration: 3000,
          },
          detailsChanged: (s: any) => {
            this.opacities = s.track.details.slides.map(
              (slide: any) => slide.portion
            );
          },
        });
      }
    });

    if (this.sliderRef && this.sliderRef.nativeElement) {
      this.slider = new KeenSlider(this.sliderRef.nativeElement);
    }
 // Initialize Swiper after the view has been initialized
 const swiperH = new Swiper('.swiper-horizontal1', {
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const swiperV = new Swiper('.swiper-vertical1', {
  direction: 'vertical',
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

    // const mySwiper = new Swiper('.mySwiper', {
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   effect: 'coverflow',
    //   grabCursor: true,
    //   centeredSlides: true,
    //   slidesPerView: 'auto',
    //   coverflowEffect: {
    //     rotate: 50,
    //     stretch: 0,
    //     depth: 100,
    //     modifier: 1,
    //     slideShadows: true,
    //   },
    // });

    this.initSwipers();
  }

  private initSwipers(): void {
    const galleryThumbs = new Swiper('.swiper-view', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      autoplay:true,
      watchSlidesProgress: true,
    });

    const galleryview = new Swiper('.swiper-preview', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay:true,
      thumbs: {
        swiper: galleryThumbs,
      },
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
  swiperConfig: SwiperOptions = {
    pagination: { clickable: true },
  };
  imageData = [
    {
      src: './assets/images/media/12.jpg',
    },
    {
      src: './assets/images/media/8.jpg',
    },
    {
      src: './assets/images/media/28.jpg',
    },
    {
      src: './assets/images/media/31.jpg',
    },
  ];
  imageData1 = [
    {
      src: './assets/images/media/16.jpg',
    },
    {
      src: './assets/images/media/17.jpg',
    },
    {
      src: './assets/images/media/18.jpg',
    },
  ];
  imageData2 = [
    {
      src: "./assets/images/media/32.jpg",
    },
    {
      src: "./assets/images/media/31.jpg",
    },
    {
      src: "./assets/images/media/33.jpg",
    },
  ];
  imageData3 = [
    {
      src: "./assets/images/media/32.jpg",
    },
    {
      src: "./assets/images/media/31.jpg",
    },
    {
      src: "./assets/images/media/33.jpg",
    },
  ];
  imageData4 = [
    {
      src: "./assets/images/media/21.jpg",
    },
    {
      src: "./assets/images/media/17.jpg",
    },
    {
      src: "./assets/images/media/16.jpg",
    },
    
  ];
  
  imageData6 = [
    {
      src: "./assets/images/media/30.jpg",
    },
    {
      src: "./assets/images/media/23.jpg",
    },
    {
      src: "./assets/images/media/29.jpg",
    },
   
  ];
  imageData5 = [
    {
      src: "./assets/images/media/32.jpg",
    },
    {
      src:"./assets/images/media/33.jpg",
    },
    {
      src:"./assets/images/media/33.jpg",
    },

  ];
  imageData7 = [
    {
      src: "./assets/images/media/16.jpg",
    },
    {
      src: "./assets/images/media/18.jpg" ,
    },
    {
      src: "./assets/images/media/19.jpg" ,
    },
   
  ];
  
  imageData8 = [
    {
      src: "./assets/images/media/21.jpg",
    },
    {
      src: "./assets/images/media/17.jpg",
    },
    {
      src: "./assets/images/media/16.jpg",
    },
   
  ];





  imageData9 = [
    {
      src:"./assets/images/media/12.jpg",
    },
    {
      src: "./assets/images/media/8.jpg",
    },
    {
      src: "./assets/images/media/5.jpg",
    },
  
  ];
  imageData10 = [
    {
      src: "./assets/images/media/31.jpg",
    },
    {
      src: "./assets/images/media/12.jpg",
    },
    {
      src: "./assets/images/media/8.jpg",
    },

  ];
  imageData11 = [
    {
      src: "./assets/images/media/60.jpg",
    },
    {
      src: "./assets/images/media/30.jpg",
    },
    {
      src: "./assets/images/media/32.jpg",
    },
  ];

}