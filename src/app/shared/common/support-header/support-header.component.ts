import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, fromEvent } from 'rxjs';
import { SupportSwitcherComponent } from '../support-switcher/support-switcher.component';


@Component({
  selector: 'app-support-header',
  templateUrl: './support-header.component.html',
  styleUrls: ['./support-header.component.scss'],
})
export class SupportHeaderComponent implements OnInit {
  scrolled!: boolean;
  layout: any;
  constructor(
    private modalService: NgbModal,private router: Router,private elementRef:ElementRef,public renderer: Renderer2,
  ) {
    const htmlElement =
    this.elementRef.nativeElement.ownerDocument.documentElement;
  const bodyElement = document.body;
  this.renderer.setAttribute(htmlElement, 'data-nav-style', 'menu-hover');
  this.renderer.setAttribute(htmlElement, 'data-toggled', 'close');
  this.renderer.removeClass(bodyElement, 'sidebar-mini');
  this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'horizontal');
  this.renderer.removeAttribute(htmlElement, 'data-header-styles');
  this.renderer.removeAttribute(htmlElement, 'data-menu-styles');
  this.renderer.removeAttribute(htmlElement, 'dir');
  this.renderer.removeAttribute(htmlElement, 'loader');
  this.renderer.setAttribute(htmlElement, 'data-theme-mode', 'light');
  htmlElement.removeAttribute('style');
  }
  private supportMenuClick$: any;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
  private offcanvasService = inject(NgbOffcanvas);
  openSwitcher() {
    this.offcanvasService.open(SupportSwitcherComponent, {
      position: 'end',
      scroll: true,
    });
  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  signout() {
    // this.authService.SignOut();
  }
  toggleSidebar() {
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    const currentToggleValue = htmlElement.getAttribute('data-toggled');

    if (currentToggleValue !== 'open') {
      this.renderer.setAttribute(htmlElement, 'data-toggled', 'open');
    } else {
      this.renderer.setAttribute(htmlElement, 'data-toggled', 'close');
    }
  }
  isActive1(route: string): boolean {
    return this.router.url.startsWith(route);
  }
  isActive(paths: string[]): boolean {
    const currentUrl = this.router.url;
    return paths.some(path => currentUrl.startsWith(path));
  }

  expande = false;
  expande1 = false;
  expande2 = false;


  toggleExpand(): void {
    this.expande = !this.expande;
    if (localStorage.getItem('data-menu-styles') == 'light') {
      document.querySelector('html')?.setAttribute('data-menu-styles', 'light');
    } else if (localStorage.getItem('data-menu-styles') == 'light') {
      document.querySelector('html')?.setAttribute('data-menu-styles', 'light');
    }
  }
  open(content: any) {
    this.modalService.open(content);
  }


  sidebarClose(){
    document.querySelector('.app')?.classList.remove('active');
  }

  ngOnInit(): void {
    this.localStorageBackUp();
  }
  themeChange( type: string) {

      const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
  
    this.renderer.setAttribute(htmlElement, 'data-theme-mode', type);
    localStorage.setItem('dayonedarktheme',type);
   
  }
  
  //  Directions
  DirectionsChange(type: string) {
    const htmlElement =
      this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, 'dir', type);
    localStorage.setItem('dir', type);
  }
//Theme Primary
primary(type: string) {
  this.elementRef.nativeElement.ownerDocument.documentElement?.style.setProperty(
    '--primary-rgb',
    type
  );
  localStorage.setItem('dayone-primary-mode', type);
  localStorage.removeItem('dayonelight-primary-color');
}
localdata=localStorage;
  localStorageBackUp() {
    let html = document.querySelector('html');
    if (localStorage.getItem('dir') == 'rtl') {
      html?.setAttribute("dir", 'rtl');
    }
    if (localStorage.getItem('dayonedarktheme')) {
      const type: any = localStorage.getItem('dayonedarktheme');
      html?.setAttribute('data-theme-mode', type);
     
    }
    if (localStorage.getItem("dayone-primary-mode")) { 
      const type: any = localStorage.getItem("dayone-primary-mode");
      html?.style.setProperty('--primary-rgb', type);
    }
  }

  body!: HTMLBodyElement | null;
  color1 = '#3366ff';
  public dynamicLightPrimary(data: any): void {
    this.color1 = data.color;
  
    const dynamicPrimaryLight = document.querySelectorAll(
      'button.pcr-button'
    );
  
    this.dynamicLightPrimaryColor(dynamicPrimaryLight, this.color1);
  
    localStorage.setItem('dayone-primary-mode', this.hexToRgba(this.color1) || '');
    localStorage.setItem('dayonelight-mode', 'true');
    this.body?.classList.remove('transparent-mode');
  
    // Adding
    this.body?.classList.add('light-mode');
  
    // Removing
    this.body?.classList.remove('dark');
    this.body?.classList.remove('bg-img1');
  
  }
  handleThemeUpdate(cssVars: any) {
    const root: any = document.querySelector(':root');
    const keys = Object.keys(cssVars);
  
    keys.forEach((key) => {
      root.style.setProperty(key, cssVars[key]);
    });
  }
  // to check the value is hexa or not
   isValidHex = (hexValue: any) =>
    /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);
  
   getChunksFromString = (st: any, chunkSize: any) =>
    st.match(new RegExp(`.{${chunkSize}}`, 'g'));
  // convert hex value to 256
   convertHexUnitTo256 = (hexStr: any) =>
    parseInt(hexStr.repeat(2 / hexStr.length), 16);
  hexToRgba(hexValue: any) {
    if (!this.isValidHex(hexValue)) {
      return null;
    }
    const chunkSize = Math.floor((hexValue.length - 1) / 3);
    const hexArr = this.getChunksFromString(hexValue.slice(1), chunkSize);
    const [r, g, b, a] = hexArr.map(this.convertHexUnitTo256);
    return `${r}, ${g} ,${b}`;
  }
  //primary theme color
 dynamicLightPrimaryColor(primaryColor: any, color: any) {
  primaryColor.forEach((item: any) => {
    const cssPropName1 = `--primary-rgb`;

    this.handleThemeUpdate({
      [cssPropName1]: this.hexToRgba(color),
    });
  });
}

//reset switcher

reset() {
  localStorage.clear();
  const html: any =
  this.elementRef.nativeElement.ownerDocument.documentElement;
const body: any = document.querySelector('body');
html.style = '';
html.setAttribute('dir', 'ltr');
html.setAttribute('data-header-styles', 'light');
html.setAttribute('data-nav-layout', 'horizontal');
html.setAttribute('data-menu-position', 'fixed');
html.setAttribute('data-theme-mode', 'light');
html.removeAttribute('data-menu-styles');

  const lightclickchecked = document.getElementById(
    'switcher-light-theme'
  ) as HTMLInputElement;
  if (lightclickchecked) {
    lightclickchecked.checked = true;
  }
  const ltrclickchecked = document.getElementById(
    'switcher-ltr'
  ) as HTMLInputElement;
  if (ltrclickchecked) {
    ltrclickchecked.checked = true;
  }
}
}
