import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { Router } from '@angular/router';
// Menu
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
	badgeType?: string
}

@Injectable({
	providedIn: 'root',
})
export class NavService implements OnDestroy {
	private unsubscriber: Subject<any> = new Subject();
	public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
		window.innerWidth
	);

	// Search Box
	public search = false;

	// Language
	public language = false;

	// Mega Menu
	public megaMenu = false;
	public levelMenu = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// For Horizontal Layout Mobile
	public horizontal: boolean = window.innerWidth < 991 ? false : true;

	// Full screen
	public fullScreen = false;
	active: any;

	constructor(private router: Router) {
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize')
			.pipe(debounceTime(1000), takeUntil(this.unsubscriber))
			.subscribe((evt: any) => {
				this.setScreenWidth(evt.target.innerWidth);
				if (evt.target.innerWidth < 991) {
					this.collapseSidebar = true;
					this.megaMenu = false;
					this.levelMenu = false;
				}
				if (evt.target.innerWidth < 1199) {
					this.megaMenuColapse = true;
				}
			});
		if (window.innerWidth < 991) {
			// Detect Route change sidebar close
			this.router.events.subscribe((event) => {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next;
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}

	MENUITEMS: Menu[] = [
		// Dashboard
		{ headTitle: 'DASHBOARDS' },
		{
			title: 'Dashboards',
			icon: 'home',
			dirchange: false,
			type: 'sub',
			active: false,
			children: [
				{
					title: 'Department Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', selected: false, active: false, children: [
						{ path: '/dashboard/department-dashboard/department', title: 'Départements', icon: 'layers', type: 'link', selected: false },
					]
				},
			
				
			
				{
					title: 'Protocol Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', selected: false, active: false, children: [
						{ path: '/dashboard/protocol-dashboard/selection', title: 'Protocol Selection', type: 'link', selected: false },
						{ path: '/dashboard/protocol-dashboard/create', title: 'Create Protocol', type: 'link', selected: false },
					]
				},
				
				{
					title: 'Report Dashboard', type: 'sub', selected: false, active: false, children: [
						{ path: '/dashboard/report-dashboard/view-reports', title: 'Report List', type: 'link', selected: false },
						{ path: '/dashboard/report-dashboard/protocol-selection', title: 'New Report', type: 'link', selected: false },
					//	{ path: '/dashboard/report-dashboard/protocols', title: 'Protocol Management', type: 'link', selected: false },
					]
				},
				{
					title: 'Super Admin', type: 'sub', active: false, selected: false, children: [
						{ path: '/dashboard/super-admin/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/dashboard/super-admin/companies', title: 'Companies', type: 'link', selected: false },
						{ path: '/dashboard/super-admin/subscription-plans', title: 'Subscription Plans', type: 'link', selected: false },
						{ path: '/dashboard/super-admin/invoices', title: 'Invoices', type: 'link', selected: false },
						{ path: '/dashboard/super-admin/super-admins', title: 'Super Admins', type: 'link', selected: false },
						{ path: '/dashboard/super-admin/settings', title: 'Settings', type: 'link', selected: false },
						{ path: '/dashboard/super-admin/role-access', title: 'Role Access', type: 'link', selected: false },
					]
				},
			],
		},
		
		{
			path: '/chat', title: 'Chat', icon: 'message-square', type: 'link', bookmark: true, selected: false
		},
		{
			title: 'Admin', icon: 'airplay', type: 'sub', active: false, selected: false, children: [
				{ path: '/admin/general-settings', title: 'General Settings', type: 'link', selected: false },
				{ path: '/admin/api-settings', title: 'Api Settings', type: 'link', selected: false },
				{ path: '/admin/role-access', title: 'Role Access', type: 'link', selected: false },
			]
		},


	
		{
			path: '/dashboard/report-dashboard/view-reports', title: 'Rapports', icon: 'file-text', type: 'link', bookmark: true, selected: false
		},
		{
			path: '/pages/notify-list', title: 'Notifications', icon: 'bell', type: 'link', bookmark: true, selected: false
		},
		{
			path: '/dashboard/protocol-dashboard/create', title: 'Créer Protocole', icon: 'plus-circle', type: 'link', bookmark: true, selected: false
		},
		{
			path: '/dashboard/department-dashboard/department',
			title: 'Départements',
			icon: 'grid',
			type: 'link',
			selected: false
		},
		{
			path: '/dashboard/employess-dashboard/employees',
			title: 'Employés',
			icon: 'user-check',
			type: 'link',
			selected: false
		},

	
	
	
	
	 
	];
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
