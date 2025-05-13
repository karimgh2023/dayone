import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

// Menu interface
export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: string;
  dirchange?: boolean;
  title?: string;
  icon?: string;
  type?: string;
  badgeValue?: string;
  badgeClass?: string;
  active?: boolean;
  selected?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  Menusub?: boolean;
  target?: boolean;
  menutype?: string;
  badgeType?: string;
  roles?: string[];
}
@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();

  // BehaviorSubject for the filtered menu items
  public items = new BehaviorSubject<Menu[]>([]);

  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
  public search = false;
  public language = false;
  public megaMenu = false;
  public levelMenu = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199;
  public collapseSidebar: boolean = window.innerWidth < 991;
  public horizontal: boolean = window.innerWidth < 991;
  public fullScreen = false;

  // Master list of all possible menu entries
  private readonly ALL_MENU: Menu[] = [
    { headTitle: 'DASHBOARDS' },
    {
      path: '/dashboard/report-dashboard/view-reports',
      title: 'Rapports',
      icon: 'file-text',
      type: 'link',
      bookmark: true,
      selected: false,
      roles: ['EMPLOYEE', 'DEPARTMENT_MANAGER','ADMIN']
    },
    {
      path: '/pages/notify-list',
      title: 'Notifications',
      icon: 'bell',
      type: 'link',
      bookmark: true,
      selected: false
    },
    {
      path: '/dashboard/protocol-dashboard/create',
      title: 'Créer Protocole',
      icon: 'plus-circle',
      type: 'link',
      bookmark: true,
      selected: false,
      roles: ['ADMIN']
    },
    {
      path: '/dashboard/department-dashboard/department',
      title: 'Départements',
      icon: 'grid',
      type: 'link',
      selected: false,
      roles: ['ADMIN']
    },
    {
      path: '/dashboard/employess-dashboard/employees/employee-list',
      title: 'Employés',
      icon: 'user-check',
      type: 'link',
      selected: false,
      roles: ['ADMIN']
    }
  ];

  constructor(private router: Router, private authService: AuthService) {
    this.setScreenWidth(window.innerWidth);

    // Watch for window resize
    fromEvent(window, 'resize')
      .pipe(debounceTime(300), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        this.collapseSidebar = evt.target.innerWidth < 991;
        this.megaMenu = false;
        this.levelMenu = false;
        this.megaMenuColapse = evt.target.innerWidth < 1199;
      });

    // Collapse sidebar on route change for small screens
    if (window.innerWidth < 991) {
      this.router.events.pipe(takeUntil(this.unsubscriber)).subscribe((event: Event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }

    // Build initial menu based on user role
    this.refreshMenu();
  }

  ngOnDestroy() {
    this.unsubscriber.next(null);
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  /** Returns the current user's role, or null if not authenticated */
  private getCurrentUserRole(): string | null {
    return this.authService.getUserRole();
  }

  /** Filters ALL_MENU by the current role and emits the result */
  private refreshMenu(): void {
    const role = this.getCurrentUserRole();
    const filtered = this.ALL_MENU.filter(item => {
      // Public if no roles specified
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      // Otherwise only include if the user's role is allowed
      return role !== null && item.roles.includes(role);
    });
    this.items.next(filtered);
  }
}
