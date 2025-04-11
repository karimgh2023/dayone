import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize, GalleryModule } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [SharedModule,GalleryModule,LightboxModule,RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  items!: GalleryItem[];

  imageData = data;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }

  ngOnInit(): void {
     /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map((item:any) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}

const data = [
  {
    srcUrl: './assets/images/media/29.jpg',
    previewUrl: './assets/images/media/29.jpg'
  },
  {
    srcUrl: './assets/images/media/33.jpg',
    previewUrl: './assets/images/media/33.jpg'
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
    srcUrl: './assets/images/media/35.jpg',
    previewUrl: './assets/images/media/35.jpg'
  },
  {
    srcUrl: './assets/images/media/36.jpg',
    previewUrl: './assets/images/media/36.jpg'
  },

];