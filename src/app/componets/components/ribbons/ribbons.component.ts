import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/common/sharedmodule';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ribbons',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './ribbons.component.html',
  styleUrl: './ribbons.component.scss'
})
export class RibbonsComponent {

}
