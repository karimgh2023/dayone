import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/common/sharedmodule';

@Component({
  selector: 'app-breakpoints',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './breakpoints.component.html',
  styleUrl: './breakpoints.component.scss'
})
export class BreakpointsComponent {

}
