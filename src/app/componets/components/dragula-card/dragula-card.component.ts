import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { SortablejsModule } from '@maksim_m/ngx-sortablejs';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dragula-card',
  standalone: true,
  imports: [SharedModule,RouterModule,SortablejsModule,NgbCollapseModule],
  templateUrl: './dragula-card.component.html',
  styleUrls: ['./dragula-card.component.scss']
})
export class DragulaCardComponent implements OnInit {
  isCardVisible = true;

  toggleCard() {
    this.isCardVisible = !this.isCardVisible;
  }

  isCollapsed = false;
  isCollapsed1 = false;

  closeResult: string | undefined;

  ngOnInit(): void {}
  fullScreenToggle() {
    document
      .querySelector('.fullscreentoggle')
      ?.classList.toggle('card-fullscreen');
  }

    // Define sortable options
    normalOptions = {
      animation: 150,
      group: 'shared',
      // Add other options here as needed
    };
    // Handle sort end event
    onSortEnd(event: any) { }
    normalList1:any
    normalList2:any
}
   