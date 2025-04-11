import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../common/sharedmodule';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-authentication-layout',
  templateUrl: './authentication-layout.component.html',
  styleUrl: './authentication-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationLayoutComponent {
  constructor(private router: Router,public renderer: Renderer2,private elementRef:ElementRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      } else if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }
    });
    const htmlElement =
    this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.removeAttribute(htmlElement, 'data-vertical-style');

  }
}
