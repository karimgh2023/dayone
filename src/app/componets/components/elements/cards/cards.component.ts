import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [SharedModule,NgbCollapseModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  isCollapsed=false
  isCollapsed1=false

  toggleClass = 'card-fullscreen';
  public fullScreen: boolean = true;

  fullScreenToggle() {
    document
      .querySelector('.fullscreentoggle')
      ?.classList.toggle('card-fullscreen');
  }

  isCardVisible = true;

  toggleCard() {
    this.isCardVisible = !this.isCardVisible;
  }
}
