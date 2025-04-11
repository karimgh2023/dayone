import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent {

}
