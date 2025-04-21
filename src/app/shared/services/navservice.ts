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
					title: 'Hr Dashboard',
					dirchange: false,
					type: 'sub',
					active: false,
					selected: false,
					children: [
						{
							title: 'Dashboard',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/dashboard/hrmdashboards/dashboard',
						},
						{
							title: 'Department',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/dashboard/hrmdashboards/department',
						},
						{
							title: 'Employees', type: 'sub', active: false, selected: false, children: [
								{ path: '/dashboard/hrmdashboards/employees/employee-list', title: 'Employees List', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/employees/view-employee', title: 'View Employee', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/employees/add-employee', title: 'Add Employee', type: 'link', selected: false },
							]
						},
						{
							title: 'Attendance', type: 'sub', active: false, selected: false, Menusub: false, children: [
								{ path: '/dashboard/hrmdashboards/attendance/attendence-list', title: 'Attendence List', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/attendance/attendencebyuser', title: 'Attendence By User', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/attendance/attendenceview', title: 'Attendence View', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/attendance/overview-calendar', title: 'Overview Calendar', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/attendance/attendence-mark', title: 'Attendence Mark', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/attendance/leave-settings', title: 'Leave Settings', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/attendance/leave-applications', title: 'Leave Applications', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/attendance/recent-leaves', title: 'Recent Leaves', type: 'link', selected: false },
							]
						},
						{ title: 'Awards', dirchange: false, type: 'link', active: false, selected: false, path: '/dashboard/hrmdashboards/awards' },
						{ title: 'Holidays', dirchange: false, type: 'link', active: false, selected: false, path: '/dashboard/hrmdashboards/holidays' },
						{ title: 'Notice Board', dirchange: false, type: 'link', active: false, selected: false, path: '/dashboard/hrmdashboards/notice-board' },
						{ title: 'Expenses', dirchange: false, type: 'link', active: false, selected: false, path: '/dashboard/hrmdashboards/expenses' },
						{
							title: 'payroll', type: 'sub', active: false, selected: false, children: [
								{ path: '/dashboard/hrmdashboards/payroll/employee-salary', title: 'Employee Salary', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/payroll/add-payroll', title: 'Add Payroll', type: 'link', selected: false },
								{ path: '/dashboard/hrmdashboards/payroll/edit-payroll', title: 'Edit payroll', type: 'link', selected: false },
							]
						},
						{ title: 'Events', dirchange: false, type: 'link', active: false, selected: false, path: '/dashboard/hrmdashboards/events' },

						{ title: 'Settings', dirchange: false, type: 'link', active: false, selected: false, path: '/dashboard/hrmdashboards/settings' },
					]
				},
				{
					title: 'Employee Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, selected: false, children: [
						{ path: '/dashboard/employee-dashboard/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/dashboard/employee-dashboard/attendance', title: 'Attendance', type: 'link', selected: false },
						{ path: '/dashboard/employee-dashboard/apply-leaves', title: 'Apply Leaves', type: 'link', selected: false },
						{ path: '/dashboard/employee-dashboard/my-leaves', title: 'My Leaves', type: 'link', selected: false },
						{ path: '/dashboard/employee-dashboard/payslips', title: 'Payslips', type: 'link', selected: false },
						{ path: '/dashboard/employee-dashboard/expenses', title: 'Expenses', type: 'link', selected: false },
					]
				},
				{
					title: 'Task Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', selected: false, active: false, children: [
						{ path: '/dashboard/task-dashboard/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/task-list', title: 'Task List', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/running-tasks', title: 'Running Tasks', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/onhold-tasks', title: 'OnHold Tasks', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/completed-tasks', title: 'Completed Tasks', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/view-tasks', title: 'View Tasks', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/overview-calendar', title: 'Overview Calendar', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/task-board', title: 'Task Board', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/new-task', title: 'New Tasks', type: 'link', selected: false },
						{ path: '/dashboard/task-dashboard/user-profile', title: 'User Profile', type: 'link', selected: false },
					]
				},
				{
					title: 'Project Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', selected: false, active: false, children: [
						{ path: '/dashboard/project-dashboard/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/dashboard/project-dashboard/project-list', title: 'Project List', type: 'link', selected: false },
						{ path: '/dashboard/project-dashboard/view-project', title: 'View Project', type: 'link', selected: false },
						{ path: '/dashboard/project-dashboard/overview-calendar', title: 'Overview Calendar', type: 'link', selected: false },
						{ path: '/dashboard/project-dashboard/new-project', title: 'New Project', type: 'link', selected: false },
					]
				},
				{
					title: 'Client Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', selected: false, active: false, children: [
						{ path: '/dashboard/client-dashboard/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/dashboard/client-dashboard/client-list', title: 'Client List', type: 'link', selected: false },
						{ path: '/dashboard/client-dashboard/view-client', title: 'View Client', type: 'link', selected: false },
						{ path: '/dashboard/client-dashboard/new-client', title: 'New Client', type: 'link', selected: false },
						{ path: '/dashboard/client-dashboard/user-profile', title: 'User Profile', type: 'link', selected: false },
					]
				},
				{
					title: 'Job Dashboard', type: 'sub', badgeType: 'success', badgeValue: '2', selected: false, active: false, children: [
						{ path: '/dashboard/job-dashboard/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/dashboard/job-dashboard/job-list', title: 'Job List', type: 'link', selected: false },
						{ path: '/dashboard/job-dashboard/apply-jobs', title: 'Apply Jobs', type: 'link', selected: false },
						{ path: '/dashboard/job-dashboard/job-view', title: 'Job View', type: 'link', selected: false },
						{ path: '/dashboard/job-dashboard/user-profile', title: 'User Profile', type: 'link', selected: false },
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
			title: 'Support System', icon: 'headphones', type: 'sub', badgeType: 'success', selected: false, active: false, children: [
				{
					title: 'Landing Pages', type: 'sub', active: false, selected: false, children: [
						{ path: '/support-system/landing-pages/landing-page', title: 'Landing Page', type: 'link', selected: false },
						{ path: '/support-system/landing-pages/knowledge-page', title: 'Knowledge Page', type: 'link', selected: false },
						{ path: '/support-system/landing-pages/knowledge-view', title: 'Knowledge View', type: 'link', selected: false },
					]
				},
				{
					title: 'User Pages', type: 'sub', active: false, selected: false, children: [
						{ path: '/support-system/user-pages/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/support-system/user-pages/profile', title: 'Profile', type: 'link', selected: false },
						{
							title: 'Tickets', type: 'sub', active: false, selected: false, children: [
								{ path: '/support-system/user-pages/tickets/ticket-list', title: 'Ticket List', type: 'link', selected: false },
								{ path: '/support-system/user-pages/tickets/active-tickets', title: 'Active Tickets', type: 'link', selected: false },
								{ path: '/support-system/user-pages/tickets/closed-tickets', title: 'Closed Tickets', type: 'link', selected: false },
								{ path: '/support-system/user-pages/tickets/create-tickets', title: 'Create Ticket', type: 'link', selected: false },
								{ path: '/support-system/user-pages/tickets/view-ticket', title: 'View Ticket', type: 'link', selected: false },
							]
						},
					]
				},
				{
					title: 'Admin', type: 'sub', active: false, selected: false, children: [
						{ path: '/support-system/admin/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{ path: '/support-system/admin/edit-profile', title: 'Edit Profile', type: 'link', selected: false },
						{
							title: 'Tickets', type: 'sub', active: false, selected: false, children: [
								{ path: '/support-system/admin/tickets/ticket-list', title: 'Ticket List', type: 'link', selected: false },
								{ path: '/support-system/admin/tickets/active-tickets', title: 'Active Tickets', type: 'link', selected: false },
								{ path: '/support-system/admin/tickets/closed-tickets', title: 'Closed Tickets', type: 'link', selected: false },
								{ path: '/support-system/admin/tickets/new-tickets', title: 'New Ticket', type: 'link', selected: false },
								{ path: '/support-system/admin/tickets/view-ticket', title: 'View Ticket', type: 'link', selected: false },
							]
						},
						{ path: '/support-system/admin/customers', title: 'Customers', type: 'link', selected: false },
						{ path: '/support-system/admin/categories', title: 'Categories', type: 'link', selected: false },
						{ path: '/support-system/admin/articles', title: 'Articles', type: 'link', selected: false },
					]
				},
				{
					title: 'Agent', type: 'sub', active: false, selected: false, children: [
						{ path: '/support-system/agent/dashboard', title: 'Dashboard', type: 'link', selected: false },
						{
							title: 'Tickets', type: 'sub', active: false, selected: false, children: [
								{ path: '/support-system/agent/tickets/ticket-list', title: 'Ticket List', type: 'link', selected: false },
								{ path: '/support-system/agent/tickets/active-tickets', title: 'Active Tickets', type: 'link', selected: false },
								{ path: '/support-system/agent/tickets/closed-tickets', title: 'Closed Tickets', type: 'link', selected: false },
								{ path: '/support-system/agent/tickets/view-ticket', title: 'View Ticket', type: 'link', selected: false },
							]
						},
						{ path: '/support-system/agent/assigned-categories', title: 'Assigned Categoreies', type: 'link', selected: false },
					]
				},
			]
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
			headTitle: 'APPS'
		},
		{
			title: 'Apps', icon: 'codepen', type: 'sub', active: false, selected: false, children: [
			    {
					title: ' Forms',
					icon: 'bi-file-earmark-text side-menu__icon',
					dirchange: false,
					type: 'sub',
					active: false,
					children: [
					  {
						title: 'Form-Elements',
						dirchange: false,
						type: 'sub',
						active: false,
						selected: false,
						children: [
						  {
							title: 'Inputs',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/inputs',
						  },
						  {
							title: 'Checks-Radios',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/checks-radios',
						  },
						  {
							title: 'Input-Groups',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/input-groups',
						  },
						  {
							title: 'Form-Select',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/form-select',
						  },
						  {
							title: 'Range-Sliders',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/range-sliders',
						  },
						  {
							title: 'Input-Masks',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/input-masks',
						  },
						  {
							title: 'File-Uploads',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/file-uploads',
						  },
						  {
							title: 'Date-Time-Picker',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/date-time-picker',
						  },
						  {
							title: 'Color-Pickers',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-elements/color-pickers',
						  },





						],
					  },
					  {
						title: 'Floating-Labels',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/apps/forms/floating-labels',
					  },
					  {
						title: 'Form-Layouts',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/apps/forms/form-layouts',
					  },
					  {
						title: 'Form-Editors',
						dirchange: false,
						type: 'sub',
						active: false,
						selected: false,
						children: [
						  {
							title: 'Quill-Editor',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/forms/form-editors/quill-editor',
						  },
						],
					  },
					  {
						title: 'Validations',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/apps/forms/validations',
					  },
					  {
						title: 'Ng-select',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/apps/forms/ng-select',
					  },
					],
				  },
				  {
					title: 'Charts',
					icon: 'bi-bar-chart side-menu__icon',
					dirchange: false,
					type: 'sub',
					active: false,
					children: [
					  {
						title: 'Apex-Charts',
						dirchange: false,
						type: 'sub',
						active: false,
						selected: false,
						children: [
						  // {
						  //   title: 'a-Charts',
						  //   dirchange: false,
						  //   type: 'sub',
						  //   active: false,
						  //   selected: false,
						  //   children: [
							  {
								title: 'Area-Charts',
								dirchange: false,
								type: 'link',
								active: false,
								selected: false,
								path: '/apps/charts/apex-charts/area-charts',
							  },
						  //   ]
						  // },
						  {
							title: 'Line-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/line-charts',
						  },
						  {
							title: 'Column-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/column-charts',
						  },
						  {
							title: 'Bar-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/bar-charts',
						  },
						  {
							title: 'Mixed-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/mixed-charts',
						  },
						  {
							title: 'Range-Area-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/range-area-charts',
						  },
						  {
							title: 'Timeline-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/timeline-charts',
						  },
						  {
							title: 'Funnel-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/funnel-charts',
						  },
						  {
							title: 'Candlestick-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/candlestick-charts',
						  },
						  {
							title: 'Boxplot-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/boxplot-charts',
						  },
						  {
							title: 'Bubble-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/bubble-charts',
						  },
						  {
							title: 'Scatter-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/scatter-charts',
						  },
						  {
							title: 'Heatmap-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/heatmap-charts',
						  },
						  {
							title: 'Treemap-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/treemap-charts',
						  },
						  {
							title: 'Pie-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/pie-charts',
						  },
						  {
							title: 'Radialbar-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/radialbar-charts',
						  },
						  {
							title: 'Radar-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/radar-charts',
						  },
						  {
							title: 'Polararea-Charts',
							dirchange: false,
							type: 'link',
							active: false,
							selected: false,
							path: '/apps/charts/apex-charts/polararea-charts',
						  },
						],
					  },
					  {
						title: 'Chartjs-Charts',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/apps/charts/chartjs-charts',
					  },
					  {
						title: 'Echart-Charts',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/apps/charts/echart-charts',
					  },
					],
				  },
				{
					title: 'Widgets', type: 'sub', active: false, selected: false, children: [
						{ path: '/apps/widgets/widgets', title: 'Widgets', type: 'link', selected: false },
						{ path: '/apps/widgets/chart-widgets', title: 'Chart Widgets', type: 'link', selected: false },
					]
				},
				{
					title: 'Maps', type: 'sub', active: false, selected: false, children: [
						{ path: '/apps/maps/leaflet', title: 'Leaflet', type: 'link', selected: false }
					]
				},
				{
					title: 'Tables', type: 'sub', active: false, selected: false, children: [
						{ path: '/apps/tables/tables', title: 'Tables', type: 'link', selected: false },
						{ path: '/apps/tables/ngx-easy-table', title: 'Ngx Easy Tables', type: 'link', selected: false },
						{ path: '/apps/tables/ang-material-table', title: 'Angular Material Tables', type: 'link', selected: false },

					]
				},
				{
					path: '/apps/icons/icons', title: 'Icons', icon: 'message-square', type: 'link', selected: false
				},

			]
		},
		{
			title: 'Components', icon: 'server', type: 'sub', active: false, selected: false, children: [
				{
					title: 'Chat', type: 'sub', active: false, selected: false, children: [
						{ path: '/components/chat/chat01', title: 'Chat 01', type: 'link', selected: false },
						{ path: '/components/chat/chat02', title: 'Chat 02', type: 'link', selected: false },
						{ path: '/components/chat/chat03', title: 'Chat 03', type: 'link', selected: false },
					]
				},
				{
					title: 'Contact', type: 'sub', active: false, selected: false, children: [
						{ path: '/components/contact/contact-list01', title: 'Contact List 01', type: 'link', selected: false },
						{ path: '/components/contact/contact-list02', title: 'Contact List 02', type: 'link', selected: false },
					]
				},
				{
					title: 'File Manager', type: 'sub', active: false, selected: false, children: [
						{ path: '/components/file-manager/file-manager01', title: 'File Manager 01', type: 'link', selected: false },
						{ path: '/components/file-manager/file-manager02', title: 'File Manager 02', type: 'link', selected: false },
						{ path: '/components/file-manager/file-details', title: 'File Details', type: 'link', selected: false },
					]
				},
				{
					title: 'Todo List', type: 'sub', active: false, selected: false, children: [
						{ path: '/components/todo-list/todo-list01', title: 'Todo List 01', type: 'link', selected: false },
						{ path: '/components/todo-list/todo-list02', title: 'Todo List 02', type: 'link', selected: false },
						{ path: '/components/todo-list/todo-list03', title: 'Todo List 03', type: 'link', selected: false },
					]
				},
				{
					title: 'User List', type: 'sub', active: false, selected: false, children: [
						{ path: '/components/user-list/user-list01', title: 'User List 01', type: 'link', selected: false },
						{ path: '/components/user-list/user-list02', title: 'User List 02', type: 'link', selected: false },
						{ path: '/components/user-list/user-list03', title: 'User List 03', type: 'link', selected: false },
						{ path: '/components/user-list/user-list04', title: 'User List 04', type: 'link', selected: false },
					]
				},
				{ path: '/components/calendar', title: 'Calendar', type: 'link', selected: false },
				{ path: '/components/dragula-card', title: 'Draggable Cards', type: 'link', selected: false },
				{ path: '/components/page-sessiontimeout', title: 'Page SessionTimeout', type: 'link', selected: false },
				{ path: '/components/notifications', title: 'Notifications', type: 'link', selected: false },
				{ path: '/components/sweet-alerts', title: 'Sweet Alerts', type: 'link', selected: false },
				{ path: '/components/time-line', title: 'Time Line', type: 'link', selected: false },
				{ path: '/components/ribbons', title: 'Ribbons', type: 'link', selected: false },
			]
		},
		{
			title: 'Elements', icon: 'layers', type: 'sub', active: false, selected: false, children: [
				{ path: '/elements/alerts', title: 'Alerts', type: 'link', selected: false },
				{ path: '/elements/badge', title: 'Badges', type: 'link', selected: false },
				{ path: '/elements/breadcrumb', title: 'Breadcrumb', type: 'link', selected: false },
				{ path: '/elements/buttons', title: 'Buttons', type: 'link', selected: false },
				{ path: '/elements/cards', title: 'Cards', type: 'link', selected: false },
				{ path: '/elements/dropdowns', title: 'Dropdowns', type: 'link', selected: false },
				{ path: '/elements/images-figures', title: 'Images & Figures', type: 'link', selected: false },
				{ path: '/elements/listgroup', title: 'List Group', type: 'link', selected: false },
				{ path: '/elements/navtabs', title: 'Nav Tabs', type: 'link', selected: false },
				{ path: '/elements/objectfit', title: 'Object Fit', type: 'link', selected: false },
				{ path: '/elements/pagination', title: 'Pagination', type: 'link', selected: false },
				{ path: '/elements/popovers', title: 'Popovers', type: 'link', selected: false },
				{ path: '/elements/progress', title: 'Progress', type: 'link', selected: false },
				{ path: '/elements/spinners', title: 'Spinners', type: 'link', selected: false },
				{ path: '/elements/toasts', title: 'Toasts', type: 'link', selected: false },
				{ path: '/elements/tooltips', title: 'Tooltips', type: 'link', selected: false },
				{ path: '/elements/tags', title: 'Tags', type: 'link', selected: false },
				{ path: '/elements/typography', title: 'Typography', type: 'link', selected: false },
			]
		},

		{
			title: 'Advanced Ui',
			type: 'sub',
			icon: 'life-buoy',
			active: false,
			children: [
			  {
				path: '/advancedui/accordions',
				title: 'Accordions & Collapse',
				type: 'link',
			  },
			  {
				path: '/advancedui/carousels',
				title: 'Carousels',
				type: 'link',
			  },

			  {
				path: '/advancedui/modals-closes',
				title: 'Models & Closes',
				type: 'link',
			  },
			  {
				path: '/advancedui/navbar',
				title: 'Navbar',
				type: 'link',
			  },
			  {
				path: '/advancedui/offcanvas',
				title: 'OffCanvas',
				type: 'link',
			  },
			  {
				path: '/advancedui/placeholders',
				title: 'Placeholders',
				type: 'link',
			  },
			  {
				path: '/advancedui/rating',
				title: 'Ratings',
				type: 'link',
			  },
			  {
				path: '/advancedui/scrollspy',
				title: 'Scrollspy',
				type: 'link',
			  },
			  {
				path: '/advancedui/swiperjs',
				title: 'SwiperJs',
				type: 'link',
			  },
			],
		  },
		{
			headTitle: 'PAGES'
		},
		{
			title: 'Pages', icon: 'copy', type: 'sub', badgeType: 'success', active: false, selected: false, children: [
				{
					title: 'Profile', type: 'sub', active: false, selected: false, children: [
						{ path: '/pages/profile/profile01', title: 'Profile 01', type: 'link', selected: false },
						{ path: '/pages/profile/profile02', title: 'Profile 02 ', type: 'link', selected: false },
						{ path: '/pages/profile/profile03', title: 'Profile 03', type: 'link', selected: false },
					]
				},
				{ path: '/pages/edit-profile', title: 'Edit Profile', type: 'link', selected: false },
				{
					title: 'Email', type: 'sub', active: false, selected: false, children: [
						{ path: '/pages/email/email-compose', title: 'Email Compose', type: 'link', selected: false },
						{ path: '/pages/email/email-inbox', title: 'Email Inbox', type: 'link', selected: false },
						{ path: '/pages/email/email-read', title: 'Email Read', type: 'link', selected: false },
					]
				},
				{
					title: 'Pricing', type: 'sub', active: false, selected: false, children: [
						{ path: '/pages/pricing/pricing01', title: 'pricing 01', type: 'link', selected: false },
						{ path: '/pages/pricing/pricing02', title: 'pricing 02', type: 'link', selected: false },
						{ path: '/pages/pricing/pricing03', title: 'pricing 03', type: 'link', selected: false },
					]
				},
				{
					title: 'Invoice', type: 'sub', active: false, selected: false, children: [
						{ path: '/pages/invoice/invoice-list', title: 'Invoice List', type: 'link', selected: false },
						{ path: '/pages/invoice/invoice01', title: 'Invoice 01', type: 'link', selected: false },
						{ path: '/pages/invoice/invoice02', title: 'Invoice 02', type: 'link', selected: false },
						{ path: '/pages/invoice/invoice03', title: 'Invoice 03', type: 'link', selected: false },
						{ path: '/pages/invoice/add-invoice', title: 'Add Invoice', type: 'link', selected: false },
						{ path: '/pages/invoice/edit-invoice', title: 'Edit Invoice', type: 'link', selected: false },
					]
				},
				{
					title: 'Blog', type: 'sub', active: false, selected: false, children: [
						{ path: '/pages/blog/blog01', title: 'Blog 01', type: 'link', selected: false },
						{ path: '/pages/blog/blog02', title: 'Blog 02', type: 'link', selected: false },
						{ path: '/pages/blog/blog03', title: 'Blog 03', type: 'link', selected: false },
						{ path: '/pages/blog/blog-styles', title: 'Blog Styles', type: 'link', selected: false },
					]
				},

				{ path: '/pages/gallery', title: 'Gallery', type: 'link', selected: false },
				{ path: '/pages/faqs', title: 'FAQS', type: 'link', selected: false },
				{ path: '/pages/terms', title: 'Terms', type: 'link', selected: false },
				{ path: '/pages/empty-pages', title: 'Empty Page', type: 'link', selected: false },
				{ path: '/pages/search', title: 'Search', type: 'link', selected: false },
				{ path: '/pages/about', title: 'About', type: 'link', selected: false },
				{ path: '/pages/notify-list', title: 'Notify-list', type: 'link', selected: false },
				{ path: '/pages/settings', title: 'Settings', type: 'link', selected: false },
			    {
					title: ' Utilities',
					dirchange: false,
					type: 'sub',
					active: false,
					children: [
					  {
						title: 'Avatars',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/avatars',
					  },
					  {
						title: 'Borders',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/borders',
					  },
					  {
						title: 'Breakpoints',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/breakpoints',
					  },
					  {
						title: 'Colors',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/colors',
					  },
					  {
						title: 'Columns',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/columns',
					  },
					  {
						title: 'Flex',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/flex',
					  },
					  {
						title: 'Gutters',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/gutters',
					  },
					  {
						title: 'Helpers',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/helpers',
					  },
					  {
						title: 'Positions',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/positions',
					  },
					  {
						title: 'Additional-Content',
						dirchange: false,
						type: 'link',
						active: false,
						selected: false,
						path: '/utilities/additional-content',
					  },
					],
				  },
			]
		},
		{
			title: 'Submenus', icon: 'sliders', type: 'sub', active: false, selected: false, children: [
				{ title: 'level-1', type: 'empty', selected: false },
				{
					title: 'level2', type: 'sub', active: false, selected: false, children: [
						{ title: 'level-2.1', type: 'empty', selected: false },
						{ title: 'level-2.2', type: 'empty', selected: false },
						{
							title: 'level2.3', type: 'sub', active: false, selected: false, children: [
								{ title: 'level-2.3.1', type: 'empty', selected: false },
								{ title: 'level-2.3.2', type: 'empty', selected: false },
							]
						},
					]
				},
			]
		},
		{
			title: 'Account', icon: 'lock', type: 'sub', badgeType: 'success', active: false, selected: false, children: [
				{
					title: 'Login', type: 'sub', active: false, selected: false, children: [
						{ path: '/account/login/login01', title: 'Login 01', type: 'link', selected: false },
						{ path: '/account/login/login02', title: 'Login 02 ', type: 'link', selected: false },
						{ path: '/account/login/login03', title: 'Login 03', type: 'link', selected: false },
					]
				},
				{
					title: 'Register', type: 'sub', active: false, selected: false, children: [
						{ path: '/account/register/register01', title: 'Register 01', type: 'link', selected: false },
						{ path: '/account/register/register02', title: 'Register 02 ', type: 'link', selected: false },
						{ path: '/account/register/register03', title: 'Register 03', type: 'link', selected: false },
					]
				},
				{
					title: 'Forget Password', type: 'sub', active: false, selected: false, children: [
						{ path: '/account/forget-password/forget-password01', title: 'Forget Password 01', type: 'link', selected: false },
						{ path: '/account/forget-password/forget-password02', title: 'Forget Password 02 ', type: 'link', selected: false },
						{ path: '/account/forget-password/forget-password03', title: 'Forget Password 03', type: 'link', selected: false },
					]
				},
				{
					title: 'Reset Password', type: 'sub', active: false, selected: false, children: [
						{ path: '/account/reset-password/reset-password01', title: 'Reset Password 01', type: 'link', selected: false },
						{ path: '/account/reset-password/reset-password02', title: 'Reset Password 02 ', type: 'link', selected: false },
						{ path: '/account/reset-password/reset-password03', title: 'Reset Password 03', type: 'link', selected: false },
					]
				},
				{
					title: 'Lock Screen', type: 'sub', active: false, selected: false, children: [
						{ path: '/account/lock-screen/lock-screen01', title: 'Lock Screen 01', type: 'link', selected: false },
						{ path: '/account/lock-screen/lock-screen02', title: 'Lock Screen 02 ', type: 'link', selected: false },
						{ path: '/account/lock-screen/lock-screen03', title: 'Lock Screen 03', type: 'link', selected: false },
					]
				},
				{ path: '/account/under-construction', title: 'Under Construction', type: 'link', selected: false },
				{ path: '/account/coming-soon', title: 'Coming Soon', type: 'link', selected: false },
				{
					title: 'Alert Messages', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, selected: false, children: [
						{ path: '/alert/success-message', title: 'Success Message', type: 'link', selected: false },
						{ path: '/alert/warning-message', title: 'Warning Message', type: 'link', selected: false },
						{ path: '/alert/danger-message', title: 'Danger Messages', type: 'link', selected: false },
					]
				},
				{
					title: 'error-pages', type: 'sub', badgeType: 'success', badgeValue: '2', active: false, selected: false, children: [
						{ path: '/error-page/error400', title: '400', type: 'link', selected: false },
						{ path: '/error-page/error401', title: '401', type: 'link', selected: false },
						{ path: '/error-page/error403', title: '403', type: 'link', selected: false },
						{ path: '/error-page/error404', title: '404', type: 'link', selected: false },
						{ path: '/error-page/error500', title: '500', type: 'link', selected: false },
						{ path: '/error-page/error503', title: '503', type: 'link', selected: false },
					]
				},
			]
		},
	    {
			title: 'Ecommerce',dirchange: false, icon:'shopping-cart', type: 'sub',active: false,selected: false,
			children: [
				{
					title: 'Products',
					dirchange: false,
					type: 'link',
					active: false,
					selected: false,
					path: '/ecommerce/products',
				  },
				  {
					title: 'Product Details',
					dirchange: false,
					type: 'link',
					active: false,
					selected: false,
					path: '/ecommerce/productdetails',
				  },
			  {
				title: 'Shopping Cart',
				dirchange: false,
				type: 'link',
				active: false,
				selected: false,
				path: '/ecommerce/cart',
			  },
			  {
				title: 'Checkout',
				dirchange: false,
				type: 'link',
				active: false,
				selected: false,
				path: '/ecommerce/checkout',
			  },
			  {
				title: 'Wishlist',
				dirchange: false,
				type: 'link',
				active: false,
				selected: false,
				path: '/ecommerce/wishlist',
			  },
			],
		  },

	];
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
