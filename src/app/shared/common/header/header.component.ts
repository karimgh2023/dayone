import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { Menu, NavService } from '../../services/navservice';
import { SwitcherComponent } from '../switcher/switcher.component';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from '../../services/app-state.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface PasswordUpdateRequest {
  oldPassword: string;
  newPassword: string;
}

interface Item {
  id: number;
  name: string;
  type: string;
  title: string;
  // Add other properties as needed
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 5;
  notificationCount: number = 5;
  public isCollapsed = true;
  collapse: any;
  closeResult = '';
  themeType: string | undefined;

  selectedItem: string | null = 'selectedItem';
  isOpen: boolean = false;
  modal: any;
  languages: Language[] = [];
  currentLanguage: string = 'en';
  currentLanguageFlag: string = '';
  currentUser: any;
  passwordForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private appStateService: AppStateService,
    public navServices: NavService,
    private elementRef: ElementRef,
    public renderer: Renderer2,
    public modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public languageService: LanguageService,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.localStorageBackUp();
    this.initializePasswordForm();
  }

  private offcanvasService = inject(NgbOffcanvas);

  private initializePasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  handleItemClick(title: string) {
    this.selectedItem = title;
    this.isOpen = false;
    localStorage.setItem('selectedItem', title);
  }
  open() {
    this.offcanvasService.open(SwitcherComponent, {
      position: 'end',
      scroll: true,
      panelClass:'switcher-canvas-width'
    });
  }
  openNotifications() {
    this.offcanvasService.open(RightSidebarComponent, {
      position: 'end',
      scroll: true,
    });
  }
  openModal(content: any) {
    this.modalService.open(content);
  }
  openSearch(search: any) {
    // this.modalService.open(search);
  }
  toggleSidebar() {
    let html = this.elementRef.nativeElement.ownerDocument.documentElement;
    if (html?.getAttribute('data-toggled') == 'true') {
      document.querySelector('html')?.getAttribute('data-toggled') ==
        'icon-overlay-close';
        html?.setAttribute('data-toggled', window.innerWidth <= 992 ? 'close' : '');
    }
    else if (html?.getAttribute('data-nav-style') == 'menu-click') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'menu-click-closed'
          ? ''
          : 'menu-click-closed'
      );
    } else if (html?.getAttribute('data-nav-style') == 'menu-hover') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'menu-hover-closed'
          ? ''
          : 'menu-hover-closed'
      );
    } else if (html?.getAttribute('data-nav-style') == 'icon-click') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'icon-click-closed'
          ? ''
          : 'icon-click-closed'
      );
    } else if (html?.getAttribute('data-nav-style') == 'icon-hover') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'icon-hover-closed'
          ? ''
          : 'icon-hover-closed'
      );
    }
    else if (html?.getAttribute('data-vertical-style') == 'overlay') {
      html?.setAttribute(
        'data-vertical-style','overlay' 
      );
      html?.setAttribute(
        'data-toggled', html?.getAttribute('data-toggled') == 'icon-overlay-close'
        ? ''
        : 'icon-overlay-close'
      );
    } else if (html?.getAttribute('data-vertical-style')  == 'overlay') {
      document.querySelector('html')?.getAttribute('data-toggled') != null
        ? document.querySelector('html')?.removeAttribute('data-toggled')
        : document
            .querySelector('html')
            ?.setAttribute('data-toggled', 'icon-overlay-close');
    } else if (html?.getAttribute('data-vertical-style') == 'closed') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'close-menu-close'
          ? ''
          : 'close-menu-close'
      );
    } else if (html?.getAttribute('data-vertical-style') == 'icontext') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'icon-text-close'
          ? ''
          : 'icon-text-close'
      );
    } else if (html?.getAttribute('data-vertical-style') == 'detached') {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'detached-close'
          ? ''
          : 'detached-close'
      );
    }else if (html?.getAttribute('data-vertical-style') == 'doublemenu') {
      html?.setAttribute('data-toggled', html?.getAttribute('data-toggled') == 'double-menu-close' && document.querySelector(".slide.open")?.classList.contains("has-sub")? 'double-menu-open': 'double-menu-close' );
    } 

    if (window.innerWidth <= 992) {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'open' ? 'close' : 'open'
      );
    }
  }
  updateTheme(theme: string) {
    this.appStateService.updateState({ theme, menuColor: theme, headerColor: theme });
    if (theme == 'light') {
      this.appStateService.updateState({ theme, themeBackground: '', headerColor: 'light', menuColor: 'dark' });
      let html = document.querySelector('html');
      html?.style.removeProperty('--body-bg-rgb');
      html?.style.removeProperty('--body-bg-rgb2');
      html?.style.removeProperty('--light-rgb');
      html?.style.removeProperty('--form-control-bg');
      html?.style.removeProperty('--input-border');
      html?.setAttribute('data-toggled', 'close');
      html?.setAttribute('data-toggled', window.innerWidth <= 992 ? 'close' : '');
    }
    if (theme == 'dark') {
      this.appStateService.updateState({ theme, themeBackground: '', headerColor: 'dark', menuColor: 'dark' });
      let html = document.querySelector('html');
      html?.style.removeProperty('--body-bg-rgb');
      html?.style.removeProperty('--body-bg-rgb2');
      html?.style.removeProperty('--light-rgb');
      html?.style.removeProperty('--form-control-bg');
      html?.style.removeProperty('--input-border');
      html?.setAttribute('data-toggled', 'close');
      html?.setAttribute('data-toggled', window.innerWidth <= 992 ? 'close' : '');
    }
  }
 

  localStorageBackUp() {
    let styleId = document.querySelector('#style');
  
    let html = document.querySelector('html');
    //Theme Color Mode:
    if (localStorage.getItem('headerColor') == 'dark') {
      if (localStorage.getItem('theme')) {
        const type: any = localStorage.getItem('theme');
        html?.setAttribute('data-theme-mode', type);
        html?.setAttribute('data-header-styles', type);
        html?.setAttribute('data-menu-styles', type);
      }
      if (localStorage.getItem('theme') == 'light') {
        const type: any = localStorage.getItem('theme');
        html?.setAttribute('data-theme-mode', type);
        html?.setAttribute('data-header-styles', type);
        html?.setAttribute('data-menu-styles', type);
      }
    }
  }
  isCartEmpty: boolean = false;
  isNotifyEmpty: boolean = false;

  removeRow(rowId: string) {
    const rowElement = document.getElementById(rowId);
    if (rowElement) {
      rowElement.remove();
    }
    this.cartItemCount--;
    this.isCartEmpty = this.cartItemCount === 0;
  }

  handleCardClick(event: MouseEvent) {
    // Prevent the click event from propagating to the container
    event.stopPropagation();
  }

  // Search
  public menuItems!: Menu[];
  public items!: Menu[];
  public text!: string;
  public SearchResultEmpty: boolean = false;

  ngOnInit(): void {
    // Get the selected item from local storage
    this.updateSelectedItem();
    
    // Load the current user
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user from auth service:', this.currentUser);
    
    // Set a default profile photo if none exists
    if (!this.currentUser?.profilePhoto) {
      this.currentUser = {
        ...this.currentUser,
        profilePhoto: './assets/images/users/16.jpg'
      };
    }

    // Get search input field<<----
   // setTimeout(() => {
    //  this.navServices.items.subscribe(items => {
        // Filter items based on role
     //     const role = this.authService.getUserRole();
        //this.items = items.filter(item => !item.roles || item.roles.includes(role));
      //});
      // If you use ALL_MENU for something else, filter it as well
      //const role = this.authService.getUserRole();
      //this.menuItems = this.navServices.menuItems.filter(item => !item.roles || item.roles.includes(role));
    //}, 200);
    // Initialize languages
   
    
    // Set default language values
    this.currentLanguage = 'en';
    this.currentLanguageFlag = 'us.png';

    // Set initial theme state
    this.appStateService.state$.subscribe(state => {
      this.themeType = state.theme;
    });

    // To clear and close the search field by clicking on body
    document.querySelector('.main-content')?.addEventListener('click', () => {
      this.clearSearch();
    });
    this.text = '';
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateSelectedItem();
    });
  }
  
  private updateSelectedItem() {
    const dashboard = this.activatedRoute.snapshot.firstChild?.url[0]?.path;
    this.selectedItem = dashboard ? dashboard.charAt(0).toUpperCase() + dashboard.slice(1) + ' Dashboard' : this.selectedItem;
  }
  ngOnDestroy(): void {
    const windowObject: any = window;
    let html = this.elementRef.nativeElement.ownerDocument.documentElement;
 
    window.addEventListener('resize', () => {
      if (localStorage.getItem('valexverticalstyles') != 'icon-text-close') {
        if (windowObject.innerWidth <= '991') {
          html?.setAttribute('data-toggled', 'open');
        } else {
          if (!(localStorage.getItem('valexverticalstyles') == 'doublemenu')) {
            html?.removeAttribute('data-toggled');
          }
        }
      } else {
        document
          .querySelector('html')
          ?.setAttribute('data-toggled', 'icon-text-close');
      }
    });

   
  }
  Search(searchText: string) {
    if (!searchText) return this.menuItems = [];
    // items array which stores the elements
    const items:Item[] = [];
    // Converting the text to lower case by using toLowerCase() and trim() used to remove the spaces from starting and ending
    searchText = searchText.toLowerCase().trim();
    this.items.filter((menuItems:Menu) => {
      // checking whether menuItems having title property, if there was no title property it will return
      if (!menuItems?.title) return false;
      //  checking wheteher menuitems type is text or string and checking the titles of menuitems
      if (menuItems.type === 'link' && menuItems.title.toLowerCase().includes(searchText)) {
        // Converting the menuitems title to lowercase and checking whether title is starting with same text of searchText
        if( menuItems.title.toLowerCase().startsWith(searchText)){ // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(menuItems))
          // If both are matching then the code is pushed to items array
          items.push(menuItems as Item);
        }
      }
      //  checking whether the menuItems having children property or not if there was no children the return
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems:Menu) => {
        if (!subItems?.title) return false; 
        if (subItems.type === 'link' && subItems.title.toLowerCase().includes(searchText)) {
          if( subItems.title.toLowerCase().startsWith(searchText)){         // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subItems))
            items.push(subItems as Item);
          }

        }
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems:Menu) => {
          if (subSubItems.title?.toLowerCase().includes(searchText)) {
            if( subSubItems.title.toLowerCase().startsWith(searchText)){ // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subSubItems))
              items.push(subSubItems as Item);
              
            }
          }
        });
        return true;
      });
      return this.menuItems = items;
    });
    // Used to show the No search result found box if the length of the items is 0
    if(!items.length){
      this.SearchResultEmpty = true;
    }
    else{
      this.SearchResultEmpty = false;
    }
    return true;
  }
  SearchModal(SearchModal: any) {
    this.modalService.open(SearchModal);
  }
  //  Used to clear previous search result
  clearSearch() {    
    const headerSearch = document.querySelector('.header-search');
    if (headerSearch) {
        headerSearch.classList.remove('searchdrop');
    }
    this.text = '';
    this.menuItems = [];
    this.SearchResultEmpty = false;
    return this.text, this.menuItems;
    
  }
  SearchHeader() {
    document
    .querySelector('.header-search')
    ?.classList.toggle('searchdrop');
  }
  isInputFocused: boolean = false;

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  // isFullscreen = false;

  // fullScreenToggle() {
  //   this.isFullscreen = !this.isFullscreen;
  // }
  isFullscreen: boolean = false;
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  changeLanguage(languageCode: string): void {
    this.languageService.setLanguage(languageCode);
    this.currentLanguage = languageCode;
    // Here you can add any additional logic needed when language changes
    // For example, reloading translations, updating the UI, etc.
  }

  logout(): void {
    // Call the auth service logout method
    this.authService.logout();
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  // Add this method to handle image loading errors
  onImageError(event: any) {
    // Set default profile image if the image fails to load
    event.target.src = './assets/images/users/16.jpg';
  }

  onPasswordChange(form: FormGroup) {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const request: PasswordUpdateRequest = {
      oldPassword: form.get('oldPassword')?.value,
      newPassword: form.get('newPassword')?.value
    };

    this.authService.updatePassword(request).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Password updated successfully';
        this.errorMessage = '';
        this.toastr.success(this.successMessage);
        this.modalService.dismissAll();
        this.passwordForm.reset();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to update password';
        this.successMessage = '';
        this.toastr.error(this.errorMessage);
      }
    });
  }
}
