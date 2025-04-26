import { Component, HostListener } from '@angular/core';
import {CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-draggable-cards',
  standalone: true,
  imports: [SharedModule,DragDropModule,CommonModule,CdkDrag,RouterModule],
  templateUrl: './draggable-cards.component.html',
  styleUrls: ['./draggable-cards.component.scss']
})
export class DraggableCardsComponent {
  todo = [
    `     <div class="card custom-card fullscreentoggle">
    <div class="card-header justify-content-between">
        <div class="card-title">
            Card With Fullscreen Button
        </div>
    </div>
    <div class="card-body">
        <h6 class="card-text fw-semibold">FullScreen Card</h6>
        <p class="card-text mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-primary">Read More</button>
    </div>
</div>`,
    `   <div class="card custom-card card-bg-primary">
    <a class="card-anchor"></a>
    <div class="card-body">
      <blockquote class="blockquote mb-0 text-center">
        <h6 class="text-fixed-white">The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart..</h6>
        <footer class="blockquote-footer mt-3 fs-14 text-fixed-white op-7">Someone famous as <cite title="Source Title">-Helen Keller</cite></footer>
      </blockquote>
    </div>
</div>`,

    ` <div class="card custom-card overlay-card text-fixed-white">
    <img src="./assets/images/media/media-35.jpg" class="card-img" alt="...">
    <div class="card-img-overlay d-flex flex-column p-0">
        <div class="card-header text-fixed-white">
            <div class="card-title">
                Image Overlays Are Awesome!
            </div>
        </div>
        <div class="card-body"> <div class="card-text mb-2 text-fixed-white">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even.</div> <div class="card-text text-fixed-white op-7">Last updated 3 mins ago</div> </div>       
    </div>
</div>`,
    `   <div class="card custom-card">
    <a class="card-anchor"></a>
    <div class="card-body">
        <div class="d-flex align-items-center">
            <div class="me-3">
                <span class="avatar avatar-md">
                    <img src="./assets/images/faces/15.jpg" alt="img">
                </span>
            </div>
            <div>
                <p class="card-text mb-0 fs-14 fw-semibold">Atharva Simon.</p>
                <div class="card-title text-muted fs-12 mb-0">Correspondent Professor</div>
            </div>    
        </div>
    </div>
</div>`,
`  <div class="card custom-card border border-info">
<a  class="card-anchor"></a>
<div class="card-body">
    <div class="d-flex align-items-center">
        <div class="me-3">
            <span class="avatar avatar-xl">
                <img src="./assets/images/faces/8.jpg" alt="img">
            </span>
        </div>
        <div>
            <p class="card-text text-info mb-1 fs-14 fw-semibold">Alicia Keys.</p>
            <div class="card-title fs-12 mb-1">Department Of Commerce</div>
            <div class="card-title text-muted fs-11 mb-0">24 Years, Female</div>
        </div>    
    </div>
</div>
</div>`
  ];
  done = [
    `   <div class="card custom-card overlay-card">
    <img src="./assets/images/media/media-36.jpg" class="card-img" alt="...">
    <div class="card-img-overlay d-flex flex-column p-0 over-content-bottom">
        <div class="card-body overflow-auto text-fixed-white">
            <div class="card-text">
                Image Overlays Are Awesome!
            </div>
            <div class="card-text mb-2">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even.</div>
            <div class="card-text text-fixed-white op-7">Last updated 3 mins ago</div>
            </div>
        <div class="card-footer text-fixed-white">Last updated 3 mins ago</div>
    </div>
</div>`,

    `   <div class="card custom-card card-bg-success">
    <div class="card-body">
        <div class="d-flex align-items-center w-100">
            <div class="me-2">
                <span class="avatar avatar-rounded">
                    <img src="./assets/images/faces/5.jpg" alt="img">
                </span>
            </div>
            <div class="">
                <div class="fs-15 fw-semibold">Samantha sid</div>
                <p class="mb-0 text-fixed-white op-7 fs-12">In leave for 1 month</p>
            </div>
        </div>
    </div>
</div>`,
    `   <div class="card custom-card">
    <div class="card-header border-bottom-0 justify-content-between">
        <div class="card-title">
            Card With Collapse Button
        </div>
    </div>
    <div  class="collapse show border-top" id="collapseExample">
        <div class="card-body">
            <h6 class="card-text fw-semibold">Collapsible Card</h6>
            <p class="card-text mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary">Read More</button>
        </div>
    </div>
</div>`,
    `<div class="card custom-card">
        <div class="card-header justify-content-between">
            <div class="card-title">
                Card With Close Button
            </div>
        </div>
        <div class="card-body">
            <h6 class="card-text fw-semibold" >Closed Card</h6>
            <p class="card-text mb-0">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary">Read More</button>
        </div>
    </div>`,
  ];

  constructor(private sanitizer: DomSanitizer) {}
  getSanitizedSVG(svgContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  isCollapsed = false;
  isCollapsed1 = false;
  closeResult: string | undefined;

  ngOnInit(): void {
  }
  fullScreenToggle() {
    document
      .querySelector('.fullscreentoggle')
      ?.classList.toggle('card-fullscreen');
  }
}

