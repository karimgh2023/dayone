import { Component, TemplateRef, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, filter } from 'rxjs';

interface MenuItem {
  label: string;
  routerLink: string;
  icon?: string;
  children?: MenuItem[];
  hasSub?: boolean; 
  active?: boolean; 
}
@Component({
  selector: 'app-support-sidebar',
  templateUrl: './support-sidebar.component.html',
  styleUrl: './support-sidebar.component.scss'
})
export class SupportSidebarComponent {
  currentPath: string = '';

  private routerSubscription!: Subscription;
  
  private modalService = inject(NgbModal);

  constructor(private router: Router) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.currentPath = this.router.url;
      this.updateActiveState();
    });
  }
  ngOnInit(): void {
    this.currentPath = this.router.url;
    console.log('Current Path:', this.currentPath); 
  }
  ngOnDestroy(): void {
    // Unsubscribe from the router events when component is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  
  searchOpen(searchContent: TemplateRef<any>) {
		this.modalService.open(searchContent, { size: 'lg' });
	}

  menuItems: MenuItem[] = [
    { label: 'Home', routerLink: '/apps/ecommerce/customer/landing-page' },
    { label: 'About', routerLink: '/apps/ecommerce/customer/about-us' },
    {
      label: 'Shop',
      routerLink: '',
      hasSub: true,
      children: [
        { label: 'Shop', routerLink: '/apps/ecommerce/customer/shop' },
        { label: 'Product Details', routerLink: '/apps/ecommerce/customer/product-details' },
        { label: 'Wishlist', routerLink: '/apps/ecommerce/customer/wishlist' },
        { label: 'Cart', routerLink: '/apps/ecommerce/customer/cart' },
        { label: 'Coupons', routerLink: '/apps/ecommerce/customer/coupons' },
        { label: 'Checkout', routerLink: '/apps/ecommerce/customer/checkout' },
      ]
    },
    { label: 'Vendors', routerLink: '/apps/ecommerce/vendor/vendor' },
    {
      label: 'Pages',
      routerLink: '',
      hasSub: true,
      children: [
        { label: 'My Account', routerLink: '/apps/ecommerce/customer/customer' },
        { label: 'Settings', routerLink: '/apps/ecommerce/customer/settings' },
        { label: 'Terms Of Conditions', routerLink: '/apps/ecommerce/customer/terms-conditions' },
        { label: 'Privacy Policy', routerLink: '/apps/ecommerce/customer/privacy-policy' },
        { label: 'Compare Products', routerLink: '/apps/ecommerce/customer/compare-products' },
      ]
    },
    { label: 'Contact', routerLink: '/apps/ecommerce/customer/contact' },
  ];

  activeSubmenu: string | null = null;
  openSubmenu: string | null = null;
  activeItem: string | null = null;

  isActivePath(path: string): boolean {
    console.log(this.currentPath.includes(path))
    return this.currentPath.includes(path);
  }
  updateActiveState(): void {
    this.menuItems.forEach(item => {
      if (item.children) {
        item.children.forEach((child: { routerLink: string; }) => {
          if (this.currentPath.includes(child.routerLink)) {
            this.activeSubmenu = item.label;
            this.openSubmenu = item.label;
          }
        });
      }
    });
  }

  isActive(path: string): boolean {
    return this.currentPath.includes(path);
  }

  toggleSubmenu(label: string): void {
    if (this.openSubmenu === label) {
      // If the submenu is already open, close it
      this.openSubmenu = null;
      this.activeSubmenu = null;
    } else {
      // Open the clicked submenu and close any others
      this.openSubmenu = label;
      this.activeSubmenu = label;
    }
    this.activeItem = this.activeItem === label ? null : label;
  }

  isSubmenuOpen(label: string): boolean {
    return this.openSubmenu === label;
    return this.activeItem === label;
  }

  
  isSubmenuActive(label: string): boolean {
    return this.activeSubmenu === label;
  }

  activeMenu: string | null = null; // Track active menu

  toggleMenu(label: string): void {
    this.activeMenu = this.activeMenu === label ? null : label;
  }

  isMenuActive(label: string): boolean {
    return this.activeMenu === label;
  }
  isLevel1Open = false;

  toggleLevel1() {
    this.isLevel1Open = !this.isLevel1Open;
  }
}
