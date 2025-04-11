import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription, filter, fromEvent } from 'rxjs';
import { Menu, NavService } from '../../services/navservice';

@Component({
  selector: 'app-support-system',
  templateUrl: './support-system.component.html',
  styleUrls: ['./support-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportSystemComponent implements OnInit {

  menuItems!:Menu[];
  menuitemsSubscribe$!:Subscription
  constructor(
    private router:Router, 
    private navServices: NavService, public renderer: Renderer2,
    private el: ElementRef,
    private elementRef: ElementRef){
    document.body.classList.add('landing-body');
    const htmlElement =
    this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'horizontal');
    this.renderer.setAttribute(htmlElement, 'data-nav-style', 'menu-hover');
    this.renderer.setAttribute(htmlElement, 'data-menu-position', 'fixed');
    this.renderer.setAttribute(htmlElement, 'data-theme-mode', 'light');
    this.renderer.removeAttribute(htmlElement, 'data-header-styles');
    this.renderer.removeAttribute(htmlElement, 'data-menu-styles');
    this.renderer.removeAttribute(htmlElement, 'data-vertical-style');
    this.renderer.removeAttribute(htmlElement, 'loader');
    this.renderer.removeAttribute(htmlElement, 'data-width');
    this.renderer.removeAttribute(htmlElement, 'body-bg-rgb');
    this.renderer.removeAttribute(htmlElement, 'body-bg-rgb2');
    this.renderer.removeAttribute(htmlElement, 'light-rgb');
    this.renderer.removeAttribute(htmlElement, 'data-bg-img');

    htmlElement.removeAttribute('style');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
       this.navServices.items.subscribe((menuItems: any) => {
     this.menuItems = menuItems;
   });
   this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      // Show loading indicator
    } else if (event instanceof NavigationEnd) {
      // Hide loading indicator
    }
  });
  }

  ngOnInit() {

    this.menuitemsSubscribe$ = this.navServices.items.subscribe((items: any) => {
      this.menuItems = items;
    });
 
  }


  scrolled!: boolean;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.scrolled = true
    }
    else{
      this.scrolled = false
    }
  }

  ngOnDestroy(){
 
      document.body.classList.remove('landing-body');   
      const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
      this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'vertical');
      this.renderer.setAttribute(htmlElement, 'data-menu-styles', 'dark');
      this.renderer.removeAttribute(htmlElement, 'data-nav-style')
  }
  expande = false;
  expande1 = false;
  expande2 = false;
  bodyclick() {
    this.expande1 = false;
    this.expande2 = false;
    this.expande = false;
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-toggled', 'close');
  }


}

