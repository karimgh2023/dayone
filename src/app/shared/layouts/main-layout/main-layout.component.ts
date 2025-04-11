import { ChangeDetectionStrategy, Component, ElementRef, Renderer2 } from '@angular/core';
import { Menu, NavService } from '../../services/navservice';
// import { Menu } from 'smart-webcomponents-angular';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  menuItems!:Menu[];
  currentPath: string = '';
  menuitemsSubscribe$!:Subscription
  constructor(
    private navServices: NavService,
    private elementRef: ElementRef,private renderer:Renderer2, 
    private router: Router) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    const htmlElement =
    this.elementRef.nativeElement.ownerDocument.documentElement;
    let html = document.querySelector('html');

    if (window.innerWidth <= 992) {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'close' ? 'close' : 'close'
      );
    }
  
  }
  ngOnInit() {
    this.menuitemsSubscribe$ = this.navServices.items.subscribe((items: any) => {
      this.menuItems = items;
    });

  }

  clearNavDropdown() {
    this.menuItems?.forEach((a: any) => {
      a.active = false;
      a?.children?.forEach((b: any) => {
        b.active = false;
        b?.children?.forEach((c: any) => {
          c.active = false;
        });
      });
    });
  }
  clickOnBody() {
    document.querySelector('#responsive-overlay')?.classList.remove('active');
    let html = this.elementRef.nativeElement.ownerDocument.documentElement;
    if (window.innerWidth <= 992) {
      html?.setAttribute('data-toggled', html?.getAttribute('data-toggled') == 'close' ? 'close' : 'close');
    }
    html?.removeAttribute('data-icon-text');

    this.menuItem.active = !this.menuItem.active;
    const navStyle = document.documentElement.getAttribute('data-nav-style');

    if(html.getAttribute('data-nav-layout') =='horizontal' && window.innerWidth >= 992){this.clearNavDropdown();} else
    if (navStyle === 'menu-click' || navStyle === 'menu-hover' || navStyle === 'icon-click' || navStyle === 'icon-hover') {
      document.querySelector('.double-menu-active')?.setAttribute('style', 'display: none;');
    }   
    
  }
  menuItem = {
    active: false,
  };

  ngOnDestroy() {
    this.menuitemsSubscribe$.unsubscribe();
  }
  clearToggle() {
    let html = this.elementRef.nativeElement.ownerDocument.documentElement;
   
    document.querySelector('#responsive-overlay')?.classList.remove('active');
  }
  
}
