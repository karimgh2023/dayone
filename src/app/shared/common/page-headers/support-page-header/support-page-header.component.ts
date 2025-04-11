import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-support-page-header',
  templateUrl: './support-page-header.component.html',
  styleUrl: './support-page-header.component.scss'
})
export class SupportPageHeaderComponent {
  @Input() title!: string;
  
  @Input() title2!: string;
  @Input() title1!: string;
  routerEvents:any[]=[]
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.routerEvents = event.url.split('/').filter((e: string) => e != '');
      }
    })
  } 
}
